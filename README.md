turn on mysql workbench & mysql notifier and make sure 
mysql57 is running, you do that by starting the service from the 
notifier's taskbar icon

if that doesn't work, go to cmd.exe then type in services.msc
and find MySQL Router & MySQL56, right click them and start the service

set DEBUG=myapp:* & nodemon start
then go to localhost:3000