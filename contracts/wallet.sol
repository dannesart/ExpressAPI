pragma solidity ^0.8.10;


contract Wallet{
    // events
    event Deposit(address indexed sender, uint amount);
    event Submit(uint indexed txId);
    event Approve(address indexed owner, uint indexed txId);
    event Revoke(address indexed owner, uint indexed txId);
    event Execute(uint indexed txId);

    // Models
    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
    }

    // Vars

    address[] public owners;
    uint public required;
    Transaction[] public transactions;
    
    mapping(address => bool) public isOwner;
    mapping(uint => mapping(address => bool)) public approved;

    // Modifiers
    modifier onlyOwner() {
        require(isOwner[msg.sender], "not over");
        _;
    }

    modifier txExists(uint _txId) {
        require(_txId < transactions.length, "tx does not exist");
        _;
    }

    modifier notApproved(uint _txId) {
        require(!approved[_txId][msg.sender], "tx already approved");
        _;
    }

    modifier notExecuted(uint _txId) {
        require(!transactions[_txId].executed, "tx already executed");
        _;
    }
    
    // An empty constructor that creates an instance of the conteact
    constructor(address[] memory _owners, uint _required) public{
        require(_owners.length > 0, "owner required");
        require(_required > 0 && _required <= _owners.length, "invalid required number of owners");

        for(uint i; i < _owners.length; i++){
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner is not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        required = _required;
        
    }


    receive() external payable{
        emit Deposit(msg.sender, msg.value);
    }

    // Functions

    function submit(address _to, uint _value, bytes calldata _data)
        external
        onlyOwner
    {
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false
        }));
        emit Submit(transactions.length - 1);
    }

    function approve(uint _txId)
        external
        onlyOwner
        txExists(_txId)
        notApproved(_txId)
        notExecuted(_txId)

    {
        approved[_txId][msg.sender] = true;
        emit Approve(msg.sender, _txId);
    }

    function _getApprovalCount(uint _txId) private view returns (uint count){
        for(uint i; i < owners.length; i++){
            if(approved[_txId][owners[i]]){
                count += 1;
            }
        }
    }

    function execute(uint _txId) external txExists(_txId) notExecuted(_txId) {
        require(_getApprovalCount(_txId) >= required, "approvals < required");
        Transaction storage transaction = transactions[_txId];

        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "tx failed");
        
        emit Execute(_txId);
    }

    function revoke(uint _txId) external onlyOwner txExists(_txId) notExecuted(_txId)
    {
        require(approved[_txId][msg.sender], 'tx not approved');
        approved[_txId][msg.sender] = false;
        emit Revoke(msg.sender, _txId);
    }
}