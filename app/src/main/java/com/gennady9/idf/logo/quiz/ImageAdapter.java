package com.gennady9.idf.logo.quiz;


import android.content.Context;
import android.database.SQLException;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;
import android.util.Log;

import java.io.IOException;
 
/*

  static class ViewHolder {
    public ImageView image;
    public ImageView correct;
  }

 */

public class ImageAdapter extends BaseAdapter {
    private Context mContext;
    private Integer[] mThumbIds;
    
    private String mType;
 
    // Keep all Images in array

    // Constructor
    public ImageAdapter(Context c,String Type,Integer[] ImgIds){
    //	super(c, R.layout.grid_item_view, ImgIds);
        mContext = c;
        mThumbIds = ImgIds;
        mType = Type;
    }
    
    public int getCount() {
        return mThumbIds.length;
    }
 
    public Object getItem(int position) {
        return mThumbIds[position];
    }
    
    public long getItemId(int position) {
        return mThumbIds[position];
    }
    static class ViewHolder {
        public ImageView image;
        public ImageView correct;
        public int state;
      }

    /*
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View rowView = inflater.inflate(R.layout.grid_item_view, parent, false);
        TextView textView = (TextView) rowView.findViewById(R.id.label);
        ImageView imageView = (ImageView) rowView.findViewById(R.id.icon);
        textView.setText(values[position]);
        // Change the icon for Windows and iPhone
        String s = values[position];
        if (s.startsWith("Windows7") || s.startsWith("iPhone")
            || s.startsWith("Solaris")) {
          imageView.setImageResource(R.drawable.no);
        } else {
          imageView.setImageResource(R.drawable.ok);
        }

        return rowView;
      }*/
 // Set the image according to the place of the new view
  public View getView(int position, View convertView, ViewGroup parent) {
    View rowView = convertView;
    ViewHolder holder = new ViewHolder();
    if (rowView == null) {
      LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
      rowView = inflater.inflate(R.layout.grid_item_view, null);
      holder.image = (ImageView) rowView.findViewById(R.id.grid_image_id);
   //   viewHolder.image.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
      holder.image.setAdjustViewBounds(false);
      holder.correct = (ImageView) rowView.findViewById(R.id.correct_image_id);
  //    viewHolder.correct.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
  //    viewHolder.correct.setAdjustViewBounds(true);
      holder.image.setPadding(0, 30, 0, 10);
      holder.state = 0;
      //************DATABASE START 
      
        DataBaseHelper myDbHelper = new DataBaseHelper(mContext);
         try {myDbHelper.createDataBase();} catch (IOException ioe) {
         	throw new Error("Unable to create database");}
         try {myDbHelper.openDataBase();}catch(SQLException sqle){throw sqle;} // myDbHelper.close();
        
         Log.e("IMAGE_ADAPTER", "DEBUG_GENNA - Finding resource in position = " + String.valueOf(position));
         String ImageName = mContext.getResources().getResourceEntryName(mThumbIds[position]);
         holder.state = myDbHelper.getState(mType, ImageName);
         //        holder.correctbool = myDbHelper.CheckCorrectAns(ImageName);
         myDbHelper.close();
         //**********DATABASE END
      rowView.setTag(holder);
    }
    else{
    	holder = (ViewHolder) rowView.getTag();
    }
    
    holder.image.setImageResource(mThumbIds[position]);
    
	// Returning the state of the image:
	// -1 - Not found
	// 0 - Not guessed, Can't extend
	// 1 - Guessed , Can't extend
	// 2 - Extended, Not guessed
	// 3 - Extend, all of the extended images are guessed correctly
    switch(holder.state){
    case 0: holder.correct.setImageResource(0); break;
    case 1: holder.correct.setImageResource(R.drawable.tick); break;
    case 2: holder.correct.setImageResource(R.drawable.extend); break;
    case 3: holder.correct.setImageResource(R.drawable.extendtick); break;
    }
   // if(holder.state == 1) {
 //	holder.correct.setImageResource(R.drawable.tick); // tick / tickbig
  //  } else {holder.correct.setImageResource(0);}
    rowView.setLayoutParams(new GridView.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, 250));
    return rowView;
  }
 
    
    /*
    @SuppressLint("NewApi")
	public ImageView getView(int position, View convertView, ViewGroup parent) {
    	 ImageView imageView;
    //	 ImageView testView;
    //	 testView = new ImageView(mContext);
    	
    	 /*
    	 BitmapFactory.Options options = new BitmapFactory.Options();
    	 options.inJustDecodeBounds = true;
    	 InputStream is = 
    	 BitmapFactory.decodeResource(mThumbIds, mThumbIds[position], options);
    	 int imageHeight = options.outHeight;
    	 int imageWidth = options.outWidth;
    	 String imageType = options.outMimeType;
    	 *//*
       View rowView = convertView;
        if (convertView == null) { // if it's not recycled, initialize some attributes
            imageView = new ImageView(mContext);
            imageView.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
            imageView.setAdjustViewBounds(true);
            imageView.setPadding(10, 30, 10, 30);
            imageView.setLayoutParams(new GridView.LayoutParams(
                    LayoutParams.MATCH_PARENT, 200));
            
        } else {
            imageView = (ImageView) convertView;
        }
        imageView.setImageResource(mThumbIds[position]); // Load image into ImageView
        return imageView;
    	

//        imageView.setLayoutParams(new GridView.LayoutParams(200, 200));

//        imageView.setCropToPadding(true);

    }*/

}
/*
   public View getView(int position, View convertView, ViewGroup parent) {
    View rowView = convertView;
    if (rowView == null) {
      LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
      rowView = inflater.inflate(R.layout.grid_item_view, null);
      ViewHolder viewHolder = new ViewHolder();
      viewHolder.image = (ImageView) rowView.findViewById(R.id.grid_image_id);
      viewHolder.image.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
      viewHolder.image.setAdjustViewBounds(false);
      viewHolder.correct = (ImageView) rowView.findViewById(R.id.correct_image_id);
      viewHolder.image.setPadding(0, 30, 0, 10);
      rowView.setTag(viewHolder);
    }

    ViewHolder holder = (ViewHolder) rowView.getTag();
    holder.image.setImageResource(mThumbIds[position]);
    holder.correct.setImageResource(R.drawable.tick); 
    rowView.setLayoutParams(new GridView.LayoutParams(LayoutParams.MATCH_PARENT, 250));
    return rowView;
  }
 */
 
