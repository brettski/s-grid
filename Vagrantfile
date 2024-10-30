Vagrant.configure("2") do |config|
  config.vm.provision "shell", inline: "echo Stand up Selenium hub and node"
  
  config.vm.define "hub", primary: true do |hub|
    hub.vm.box = "bento/rockylinux-9"
    hub.vm.hostname = "hub"
    hub.vm.network "private_network", ip: "10.200.0.10"
    config.vm.network "public_network", bridge: "en7: Thunderbolt Ethernet Slot 1", ip: "172.27.0.40"
    hub.vm.network "forwarded_port", guest: 4444, host: 4444
    hub.vm.provision "ansible" do |ansible|
      ansible.playbook = "playbooks/selenium.yml"
      # ansible.inventory_path= "playbooks/inventory.yml"
      ansible.extra_vars = { role: "hub" }
    end
  end 

  config.vm.define "node" do |node|
    node.vm.box = "bento/rockylinux-9"
    node.vm.hostname = "node0"
    node.vm.network "private_network", ip: "10.200.0.11"
    node.vm.provision "ansible" do |ansible|
      ansible.playbook = "playbooks/selenium.yml"
      # ansible.inventory_path= "playbooks/inventory.yml"      
      ansible.extra_vars = { role: "node" }
    end
  end

  # config.vm.provision "shell", inline: <<-SHELL
  #   echo "10.200.0.10 hub" >> /etc/hosts
  #   echo "10.200.0.11 node0" >> /etc/hosts
  # SHELL


end