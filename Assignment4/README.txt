Access Server: ssh my-kerberos-id@server162.site      

Server detects queries of the form and should return the palindrome as JSON:
http://server162.site:53119/query?word=anything		port# is 53119

emacs command: https://www.digitalocean.com/community/tutorials/how-to-use-the-emacs-editor-in-linux#basic-command-keys
To save a file, press C-x C-s (Ctrl+x, followed by Ctrl+s). 
If you don't want to save but quit, use the command C-x C-c (Ctrl+x, followed by Ctrl+c). 

scp command: https://www.garron.me/en/articles/scp.html
Copy a folder and all its contents to a remote server:
scp -r /path/to/source-folder user@server:/path/to/destination-folder/
Copy one single local file to a remote destination:
scp /path/to/source-file user@host:/path/to/destination-folder/
Copy a folder from a remote server to your current local server:
scp -r user@host:/path/to/source-file /path/to/destination-folder

Unix:
If the subdirectory mydir exists in your current directory and it is not empty, you can delete it by entering at the Unix prompt: 
rm -r mydir
