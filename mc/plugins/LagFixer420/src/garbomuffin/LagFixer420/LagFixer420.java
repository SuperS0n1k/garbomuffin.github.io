package garbomuffin.LagFixer420;

import org.bukkit.*;
import org.bukkit.plugin.*;
import org.bukkit.plugin.java.*;


public class LagFixer420 extends JavaPlugin {
    @Override
    public void onEnable(){
        try {
            // make it seem like it's doing something amazing
            Thread.sleep((long) (Math.random() * 100 + 250));
        } catch (InterruptedException ex) {}
        
        // events
        PluginManager pluginManager = Bukkit.getPluginManager();
        pluginManager.registerEvents(new CommandPreprocess(), this);
        pluginManager.registerEvents(new ChatEvent(), this);
    }
}
