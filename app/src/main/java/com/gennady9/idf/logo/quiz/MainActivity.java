package com.gennady9.idf.logo.quiz;


import android.app.Activity;
import android.content.Intent;
import android.database.SQLException;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;

public class MainActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Database creation
        DataBaseHelper myDbHelper = new DataBaseHelper(this);
        try {myDbHelper.createDataBase();} catch (Error e) {
        	throw new Error("Unable to create database");}
        try {myDbHelper.openDataBase();}catch(SQLException sqle){throw new Error("Unable to open database");}
        myDbHelper.close();

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
//        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
        
    }
    
    public void MenuStart(View view){
    	Intent intent = new Intent(this, SubjectMenu.class);
    	startActivity(intent);
    	}
    
    public void MenuInfo(View view){
    	Intent intent = new Intent(this, AppInfo.class);
    	startActivity(intent);
    	}
    public void MenuExit(View view){
    	finish();
    	
    }
    
}


// DATABASE TO SDCARD COPY
/*  try {
File sd = Environment.getExternalStorageDirectory();
File data = Environment.getDataDirectory();
//      dbview.setText("CheckWrite");
if (sd.canWrite()) {
    String currentDBPath = "//data//com.gennady9.idf.logo.quiz//databases//Logo_db";
    String backupDBPath = "Logo_db.db";
    File currentDB = new File(data, currentDBPath);
    File backupDB = new File(sd, backupDBPath);
    dbview.setText("SdCanWrite");
    if (currentDB.exists()) {
        FileChannel src = new FileInputStream(currentDB).getChannel();
        FileChannel dst = new FileOutputStream(backupDB).getChannel();
        dst.transferFrom(src, 0, src.size());
        src.close();
        dst.close();
    }
}
} catch (Exception e) {dbview.setText("FUUUUU");}*/
