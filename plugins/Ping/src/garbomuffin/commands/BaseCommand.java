package com.garbomuffin.commands;

import com.garbomuffin.config.ConfigEntry;
import com.garbomuffin.PingPlugin;

import org.bukkit.command.*;
import org.bukkit.*;
import org.bukkit.entity.*;
import org.bukkit.configuration.file.*;

abstract public class BaseCommand implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender cs, Command command, String label, String[] args){
        command(cs, args);
        return true;
    }
    
    protected Player getPlayer(String name){
        Player player = Bukkit.getPlayer(name);
        return player;
    }
    
    protected boolean isPlayer(CommandSender cs){
        return cs instanceof Player;
    }
    
    protected FileConfiguration getConfig(){
        return PingPlugin.getPlugin().getConfig();
    }
    protected ConfigEntry getConfigEntry(String path){
        return new ConfigEntry(getConfig().getString(path));
    }
    
    abstract void command(CommandSender cs, String[] args);
}
