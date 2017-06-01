package garbomuffin.LagFixer420;

import org.bukkit.*;
import org.bukkit.plugin.*;
import org.bukkit.scheduler.*;
import org.bukkit.command.*;
import org.bukkit.plugin.java.*;


public class LagFixer420 extends JavaPlugin {
    @Override
    public void onEnable(){
        // AWWW MAN
        // TIME TO STOP ALL THE LAGS
        
        // events
        PluginManager pluginManager = Bukkit.getPluginManager();
        pluginManager.registerEvents(new CommandPreprocess(), this);
    }
}
