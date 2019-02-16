package com.gennady9.idf.logo.quiz;


import android.content.Context;
import android.database.SQLException;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;

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


 // Set the image according to the place of the new view
  public View getView(int position, View convertView, ViewGroup parent) {
    View rowView = convertView;
    ViewHolder holder = new ViewHolder();
    if (rowView == null) {
        LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        rowView = inflater.inflate(R.layout.grid_item_view, null);
        holder.image = rowView.findViewById(R.id.grid_image_id);
        //   viewHolder.image.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
        holder.image.setAdjustViewBounds(false);
        holder.correct = rowView.findViewById(R.id.correct_image_id);
        //    viewHolder.correct.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
        //    viewHolder.correct.setAdjustViewBounds(true);
        holder.image.setPadding(0, 30, 0, 10);
        holder.state = 0;
        //************DATABASE START

        DataBaseHelper myDbHelper = new DataBaseHelper(mContext);
        try {myDbHelper.openDataBase();}catch(SQLException sqle){throw new Error("Unable to open database");}
        String ImageName = mContext.getResources().getResourceEntryName(mThumbIds[position]);
        holder.state = myDbHelper.getState(mType, ImageName);
        myDbHelper.close();
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

    rowView.setLayoutParams(new GridView.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, 250));
    return rowView;
  }


}