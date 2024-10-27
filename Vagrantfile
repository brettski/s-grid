Vagrant.configure("2") do |config|
  config.vm.provision "shell", inline: "echo Stand up Selenium hub and node"
  
  config.vm.define "hub", primary: true do |hub|
    hub.vm.box = "bento/rockylinux-9"
    hub.vm.network "forwarded_port", guest: 4444, host: 4444
  end 

  config.vm.define "node", do |node|
    hub.vm.box = "bento/rockylinux-9"
  ends