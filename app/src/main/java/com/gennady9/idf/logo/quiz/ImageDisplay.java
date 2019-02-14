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
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.IOException;

@SuppressLint("NewApi")
public class ImageDisplay extends Activity {

	private ImageView imgView;
	private TextView debugtv;
	private EditText inputans;
	
	private String input = "";
	LogoDatabase entry = new LogoDatabase(this);
	
	// ADD A DRAWABLE "ERROR WILL BE FIXED IN NEXT VERSION"
    
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("ImageDisplay","Start");
        int ImgId = getIntent().getIntExtra("imgId", R.drawable.bpin_zahal);
        entry.open();
        DataBaseHelper myDbHelper = new DataBaseHelper(this);
        try {myDbHelper.createDataBase();} catch (IOException ioe) {
        	throw new Error("Unable to create database");}
        try {myDbHelper.openDataBase();}catch(SQLException sqle){throw sqle;} // myDbHelper.close();
        Log.d("ImageDisplay","Getting image and type");
        String ImageName = getResources().getResourceEntryName(ImgId);
        String Type = getIntent().getStringExtra("type");
        Log.d("ImageDisplay","End of getting image and type" + ImageName + Type);
        /* 
        String extend = myDbHelper.getExtend(ImageName);
   //     if(! extend.isEmpty()){
        //	myDbHelper.close();
        	Intent intent = new Intent(this, GridDisplay.class);
        	intent.putExtra("type", "tag_aka");
        	setContentView(R.layout.grid_splash);
        	startActivity(intent);
      //  }
        */
        
        String extend = myDbHelper.getExtend(Type,ImageName);
        Log.d("imageDisplay", "IF CHECK");
        if (extend !=null &&  !extend.isEmpty()){
        //	if( !extend.equals("")){
                //	myDbHelper.close();
        	Log.d("imageDisplay", "IN IF");
    		    Intent intent = new Intent(ImageDisplay.this, GridDisplay.class);
    		    intent.putExtra("type", extend);
    		    setContentView(R.layout.grid_splash);
    		    Log.d("imageDisplay", "Before activity start");
    		    startActivity(intent);	
    		    Log.d("imageDisplay", "After activity start");
        //	}

		}
        else{
        	
        
        if(myDbHelper.CheckCorrectAns(ImageName)) {
        	setContentView(R.layout.correct_answer_display);
        	ImageView correctImg = (ImageView) findViewById(R.id.guessed_image); 
            TextView answertv = (TextView) findViewById(R.id.answer_display);
            
            
            correctImg.setImageResource(ImgId);
            String Answer = myDbHelper.getImgAnswer(this, ImageName);
            String[] Answers = Answer.split(",");
        	answertv.setText(Answers[0]);
        }
        else{
        setContentView(R.layout.activity_image_display);
        
        
        imgView = (ImageView) findViewById(R.id.zoomed_image); 
        inputans = (EditText) findViewById(R.id.answer_input);
        debugtv = (TextView) findViewById(R.id.debug_tv);
        
        imgView.setImageResource(ImgId);
        debugtv.setText(imgView.getId());
        }
        
        }
        entry.close();
        myDbHelper.close();
     //   getActionBar().setDisplayHomeAsUpEnabled(true);
    }
    
    
    public void CheckButton(View view){
    	
        int ImgId = getIntent().getIntExtra("imgId", R.drawable.bpin_zahal);
        input = inputans.getText().toString();
        entry.open();
        String ImageName = getResources().getResourceEntryName(ImgId);
        DataBaseHelper myDbHelper = new DataBaseHelper(this);
        try {myDbHelper.createDataBase();} catch (IOException ioe) {
        	throw new Error("Unable to create database");}
        try {myDbHelper.openDataBase();}catch(SQLException sqle){throw sqle;} // myDbHelper.close();
        
        String Answer = myDbHelper.getImgAnswer(this, ImageName);
        String[] Answers = Answer.split(",");
        for(int i=0; i<Answers.length; i++){
        	if(Answers[i].equals(input)){
        		//entry.SetCorrectAns(ImgId);
        		myDbHelper.SetCorrectAns(ImageName);
            	setContentView(R.layout.correct_answer_display);
            	ImageView correctImg = (ImageView) findViewById(R.id.guessed_image); 
                TextView answertv = (TextView) findViewById(R.id.answer_display);
                correctImg.setImageResource(ImgId);
            	answertv.setText(Answers[0]);
        		break;
        	}
        }
        myDbHelper.close();
    	entry.close();
    	}
    
    
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_image_display, menu);
        return true;
    }

    
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
  //          	GridDisplay.gridView.invalidateViews()
            //	Intent intent = new Intent(ImageDisplay.this,GridDisplay.class);
            	//NavUtils.shouldUpRecreateTask(this, intent);
                NavUtils.navigateUpFromSameTask(this);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
  /*  @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }
*/
}
