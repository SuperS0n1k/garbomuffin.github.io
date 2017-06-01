package com.garbomuffin;

import org.bukkit.plugin.java.*;
import org.bukkit.*;
import org.bukkit.plugin.*;

import com.garbomuffin.commands.*;

public class PingPlugin extends JavaPlugin{
    @Override
    public void onEnable(){
        plugin = this;
        
        // config
        saveDefaultConfig();
        
        PluginManager pluginManager = Bukkit.getPluginManager();
        
        // commands
        getCommand("ping").setExecutor(new Ping());
        
        LOGGER.info("[Ping] Enabled!");
    }
    
    @Override
    public void onDisable() {
        Bukkit.getScheduler().cancelTasks(this);
    }
    
    private static Plugin plugin;
    public static final Logger LOGGER = new Logger();
    
    public static Plugin getPlugin(){
        return plugin;
    }
}
