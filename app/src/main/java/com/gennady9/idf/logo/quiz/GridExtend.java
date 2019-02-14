package com.gennady9.idf.logo.quiz;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.database.SQLException;
import android.os.Bundle;
import android.view.Menu;
import android.widget.TextView;

import java.io.IOException;

public class GridExtend extends Activity {

	@SuppressLint("NewApi")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_grid_extend);
		
        int ImgId = getIntent().getIntExtra("imgId", R.drawable.bpin_zahal);
        String ImageName = getResources().getResourceEntryName(ImgId);
		
        DataBaseHelper myDbHelper = new DataBaseHelper(this);
        try {myDbHelper.createDataBase();} catch (IOException ioe) {
        	throw new Error("Unable to create database");}
        try {myDbHelper.openDataBase();}catch(SQLException sqle){throw sqle;} // myDbHelper.close();
        
		String extend = "tag_menu";//myDbHelper.getExtend(ImageName);
		myDbHelper.close();
		
		TextView dbview = (TextView) findViewById(R.id.dbextend);
        dbview.setText(extend);
      /*  if (extend !=null &&  !extend.isEmpty()){
        	dbview.setText("yeah");
        }
        else
        	dbview.setText("no no..me clean here..");
        */
        //if(! extend.equals("null"))
	//		dbview.setText("yeah");
	//	else
	//		dbview.setText("no no..me clean here..");
		
        if (extend !=null &&  !extend.isEmpty()){
		    Intent intent = new Intent(GridExtend.this, GridDisplay.class);
		    intent.putExtra("type", extend);
		    setContentView(R.layout.grid_splash);
		    startActivity(intent);
		}
		else{
            Intent intent = new Intent(GridExtend.this,ImageDisplay.class);
        	intent.putExtra("imgId", ImgId); // change to id
            startActivity(intent);
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.activity_grid_extend, menu);
		return true;
	}

}
