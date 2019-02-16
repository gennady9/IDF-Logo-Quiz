package com.gennady9.idf.logo.quiz;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.database.SQLException;
import android.os.Bundle;
import android.support.v4.app.NavUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.GridView;

@SuppressLint("NewApi")
public class GridDisplay extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
  //      setContentView(R.layout.grid_splash);
       
      /*  -- filling array with default pin
       Integer[] ChoosenArray = {
        		R.drawable.pin_zahal	
        };*/

        Integer[] ChoosenArray = null;
		
        Log.d("GridDisplay","Image Loading Started");
        DataBaseHelper myDbHelper = new DataBaseHelper(this);
        try {myDbHelper.openDataBase();}catch(SQLException sqle){throw sqle;}
        String Type = getIntent().getStringExtra("type");
     	ChoosenArray = myDbHelper.getImgIdArray(this, Type);
        myDbHelper.close();
        Log.d("GridDisplay","Image Loading ended");
        
        if(ChoosenArray == null){
        	 setContentView(R.layout.grid_not_found);
        }
        else{
            setContentView(R.layout.activity_grid_display);
            
            final Integer[] FinalArray = ChoosenArray;
            GridView gridView = findViewById(R.id.gridview);
                
                // Instance of ImageAdapter Class
                final ImageAdapter imgAdapter = new ImageAdapter(this,Type,FinalArray);
                gridView.setAdapter(imgAdapter);
                
                gridView.setOnItemClickListener(new OnItemClickListener() {
                    public void onItemClick(AdapterView<?> parent, View v, int position, long id) {
                    	                  	
                    	Intent intent = new Intent(GridDisplay.this,ImageDisplay.class);
                    //	Intent intent = new Intent(GridDisplay.this,GridExtend.class);
                    	intent.putExtra("imgId", FinalArray[position]); // change to id
                    	intent.putExtra("type", getIntent().getStringExtra("type"));
                        startActivity(intent);
                        
                    }
                });
        }

	}

	@Override
	protected void onResume()
	{
	   super.onResume();
	   this.onCreate(null); // CHECK FOR EFFICIENTY
	}


	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.activity_grid_display, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case android.R.id.home:
			// This ID represents the Home or Up button. In the case of this
			// activity, the Up button is shown. Use NavUtils to allow users
			// to navigate up one level in the application structure. For
			// more details, see the Navigation pattern on Android Design:
			//
			// http://developer.android.com/design/patterns/navigation.html#up-vs-back
			//
			NavUtils.navigateUpFromSameTask(this);
			return true;
		}
		return super.onOptionsItemSelected(item);
	}

}
