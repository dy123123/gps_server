sudo ln -s /etc/nginx/sites-available/myapp.conf /etc/nginx/sites-enabled/myapp.conf
sudo iptables -I INPUT 1 -p tcp --dport 11080 -j ACCEPT
sudo iptables -I INPUT 1 -p tcp --dport 12001 -j ACCEPT
node /home/admin/my-app/server/server.js &
