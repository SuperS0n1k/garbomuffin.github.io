package garbomuffin.rainbowchat;

import org.bukkit.plugin.java.*;
import org.bukkit.*;
import org.bukkit.plugin.*;

public class RainbowChat extends JavaPlugin{
    @Override
    public void onEnable(){
        PluginManager pluginManager = Bukkit.getPluginManager();
        
        pluginManager.registerEvents(new ChatEvent(), this);
        
        getLogger().info("[PrideChat] Enabled!");
    }
}
