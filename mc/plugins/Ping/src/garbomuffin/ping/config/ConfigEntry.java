package garbomuffin.ping.config;

import org.bukkit.ChatColor;

public class ConfigEntry {
    public ConfigEntry(String string){
        this.string = colorify(string);
    }
    
    protected static String colorify(String string, char separator) {
        return ChatColor.translateAlternateColorCodes(separator, string);
    }
    
    protected static String colorify(String string){
        return colorify(string, '&');
    }
    
    private String string;
    
    @Override
    public String toString(){
        return this.string;
    }
    
    public ConfigEntry format(String path, String item){
        string = string.replaceAll("%" + path + "%", item);
        return this;
    }
    public ConfigEntry format(String path, Object item){
        return format(path, item + "");
    }
}
