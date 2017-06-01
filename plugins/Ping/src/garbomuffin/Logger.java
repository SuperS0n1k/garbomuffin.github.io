package com.garbomuffin;

import org.bukkit.*;

public class Logger {
    public void info(String msg){
        LOG.info(msg);
    }
    public void warn(String msg){
        LOG.warning(msg);
    }
    public void error(String msg){
        Bukkit.broadcast("utils.debug", ChatColor.RED + "ERROR: " + msg);
        LOG.severe(msg);
    }
    
    private static final java.util.logging.Logger LOG = Bukkit.getLogger();
}
