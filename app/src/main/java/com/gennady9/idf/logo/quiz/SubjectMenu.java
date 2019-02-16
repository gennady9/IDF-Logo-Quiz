package com.gennady9.idf.logo.quiz;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.NavUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

public class SubjectMenu extends Activity{

    @SuppressLint("NewApi")
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_subject_menu);
   //     getActionBar().setDisplayHomeAsUpEnabled(true);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
       // getMenuInflater().inflate(R.menu.activity_subject_menu, menu);
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

    public void MButt1(View view){ //
    	Intent intent = new Intent(this, GridDisplay.class);
    	Log.d("subject menu","Pin");
    	intent.putExtra("type", "bpin");
    	startActivity(intent);
    }
    public void MButt2(View view){ //
    	Intent intent = new Intent(this, GridDisplay.class);
    	intent.putExtra("type", "tag_menu");
    	startActivity(intent);
    }
    public void MButt3(View view){ //
    	Intent intent = new Intent(this, GridDisplay.class);
    	intent.putExtra("type", "kumta");
    	startActivity(intent);
    }
    public void MButt4(View view){ //
    	Intent intent = new Intent(this, GridDisplay.class);
    	intent.putExtra("type", "rank");
    	startActivity(intent);
    }
    public void MButt5(View view){ //
    	Intent intent = new Intent(this, GridDisplay.class);
    	intent.putExtra("type", "pin");
    	startActivity(intent);
    }
    public void MButt6(View view){ //
    	Intent intent = new Intent(this, GridDisplay.class);
    	intent.putExtra("type", "flag");
    	startActivity(intent);
    }
}
