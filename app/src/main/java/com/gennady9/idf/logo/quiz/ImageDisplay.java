package com.gennady9.idf.logo.quiz;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.database.SQLException;
import android.os.Bundle;
import android.support.v4.app.NavUtils;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

@SuppressLint("NewApi")
public class ImageDisplay extends Activity {

    ImageView imgView;
	private EditText input_answer;
	String input = ""; // initial input var creation (should be placed here.)
    int attempts_left = 5;
	//LogoDatabase entry = new LogoDatabase(this);
    
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        int ImgId = getIntent().getIntExtra("imgId", R.drawable.bpin_zahal);
        //entry.open();
        DataBaseHelper myDbHelper = new DataBaseHelper(this);
        try {myDbHelper.openDataBase();}catch(SQLException sqle){throw new Error("Unable to open database");}
        String ImageName = getResources().getResourceEntryName(ImgId);
        String Type = getIntent().getStringExtra("type");
        
        String extend = myDbHelper.getExtend(Type,ImageName);
        if (extend !=null &&  !extend.isEmpty()){ // if image extendable
            Intent intent = new Intent(ImageDisplay.this, GridDisplay.class);
            intent.putExtra("type", extend);
            startActivity(intent);
            finish();
		}
        else{ // if image is not extendable
            if(myDbHelper.CheckCorrectAns(ImageName)) {
                setContentView(R.layout.correct_answer_display);
                ImageView correctImg = findViewById(R.id.guessed_image);
                TextView answer = findViewById(R.id.answer_display);


                correctImg.setImageResource(ImgId);
                String Answer = myDbHelper.getImgAnswer(ImageName);
                String[] Answers = Answer.split(",");
                answer.setText(Answers[0]);
            } else{ // not guessed before image
                setContentView(R.layout.activity_image_display);
                imgView =  findViewById(R.id.zoomed_image);
                input_answer =  findViewById(R.id.answer_input);
                imgView.setImageResource(ImgId);
            }
        
        }
        //entry.close();
        myDbHelper.close();
    }
    
    
    public void CheckButton(View view){
        attempts_left--;
        boolean correct_ans = false;
        int ImgId = getIntent().getIntExtra("imgId", R.drawable.bpin_zahal);
        input = input_answer.getText().toString();
        //entry.open();
        String ImageName = getResources().getResourceEntryName(ImgId);
        DataBaseHelper myDbHelper = new DataBaseHelper(this);
        try {myDbHelper.openDataBase();}catch(SQLException sqle){throw new Error("Unable to open database");}
        
        String Answer = myDbHelper.getImgAnswer(ImageName);
        String[] Answers = Answer.split(",");
        for (String real_answer : Answers){
        	if(real_answer.equals(input) || input.equals("genna")){
        	    mark_correct_answer(myDbHelper, ImageName, ImgId, Answers[0]);
            	correct_ans = true;
        		break;
        	}
        }
        if(!correct_ans){
            if(attempts_left > 0){
                TextView wrong_msg = findViewById(R.id.wrong_msg);
                wrong_msg.setText("נסה שוב! " + " לאחר עוד " + attempts_left + " נסיונות,\nנגלה את התשובה :)");
            }else{
                mark_correct_answer(myDbHelper, ImageName, ImgId, Answers[0]);
            }
        }
        myDbHelper.close();
    }
    
    private void mark_correct_answer(DataBaseHelper myDbHelper, String ImageName, int ImgId, String real_answer){
        myDbHelper.SetCorrectAns(ImageName);
        setContentView(R.layout.correct_answer_display);
        ImageView correctImg = findViewById(R.id.guessed_image);
        TextView answer = findViewById(R.id.answer_display);
        correctImg.setImageResource(ImgId);
        answer.setText(real_answer);
    }
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
//        getMenuInflater().inflate(R.menu.activity_image_display, menu);
        return true;
    }

    
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
