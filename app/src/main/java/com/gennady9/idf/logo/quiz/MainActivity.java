package com.gennady9.idf.logo.quiz;


import android.app.Activity;
import android.content.Intent;
import android.database.SQLException;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.TextView;

import java.io.IOException;

public class MainActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String res;

        setContentView(R.layout.activity_main);
        
                // ON CREATION - CREATE DATABASE
        


        
 	//res = myDbHelper.getData();
 	
    //    LogoDatabase entry = new LogoDatabase(this);
     //   db.delete("logoTable", null,null);
        
       /*
        entry.open();
        entry.delDatabase();
        String name = "rank";
        int imgId = 0;
      //  entry.addEntry("טוראי", R.drawable.rank1,"בדיקה");
        
        for(int i=1; i < 20; i++){
        name = "rank" + String.valueOf(i);
        imgId = getResources().getIdentifier(name, "drawable", getPackageName());
        if(imgId == 0)
        	imgId = R.drawable.pin1_zahal;
        entry.addEntry(name,imgId,"rank");
        }
        
        for(int i=1; i <= 28; i++){
        name = "pin" + String.valueOf(i);
        imgId = getResources().getIdentifier(name, "drawable", getPackageName());
        if(imgId == 0)
        	imgId = R.drawable.pin1_zahal;
        entry.addEntry(name,imgId,"pin");
        }
*/
        
        
        DataBaseHelper myDbHelper = new DataBaseHelper(this);
        try {myDbHelper.createDataBase();} catch (IOException ioe) {
        	throw new Error("Unable to create database");}
        try {myDbHelper.openDataBase();}catch(SQLException sqle){throw sqle;}
        


     	//Integer[] ChoosenArray = myDbHelper.getImgIdArray(this, "kumta");

    //    int test = myDbHelper.getImgIdArray(this, "pin");
     //   res = "";
    //    for(int i=0; i<test.length ; i++)
     //   res = res + test[1].toString();
        
     //   res = String.valueOf(test);
  //      res = myDbHelper.getData();
        myDbHelper.close();
    //    res = "debug";
    //    for(int i=0; i<ChoosenArray.length; i++)
    //   	res = res + ChoosenArray[i].toString();
        
    //    res = entry.getData();
    //    entry.close(); 
        

     //   TextView dbview = (TextView) findViewById(R.id.dbtextview);
     //   dbview.setText(res);
       
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
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

    
    /*//////////////// Another button declaration
    Button MenuInfo = (Button) findViewById(R.id.MenuInfo);
    MenuInfo.setOnClickListener(new View.OnClickListener() {
        public void onClick(View v) {
        	Intent intent = new Intent(MainActivity.this, AppInfo.class);
        	startActivity(intent);
        }
});
    
}*/

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
