1. Download openssl from google
--> https://code.google.com/archive/p/openssl-for-windows/downloads

2. Extract bin-folder to nice place, add bin-folder to env Path (if windows). 

3. Run openssl-commands... (run these commands in your API/project-folder)
--> openssl genrsa -out private.pem 4096
--> openssl rsa -in private.pem -outform PEM -pubout -out public.pem