package com.gennady9.idf.logo.quiz;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.database.sqlite.SQLiteOpenHelper;

public class LogoDatabase {

	
	public static final String KEY_ROWID = "_id";
	public static final String KEY_TYPE = "img_type";
	public static final String KEY_POSITION = "position";
	public static final String KEY_NAME = "img_name";
	public static final String KEY_IMGID = "img_id";
	public static final String KEY_ANSWER = "answer";
	public static final String KEY_CORRECT = "correct";
	public static final String KEY_HINT = "hint";
	public static final String KEY_TRIES = "tries";
	public static final String KEY_LASTG = "last_try";
	

	//String[] columnsT = new String[]{ KEY_ROWID , KEY_TYPE , KEY_POSITION , KEY_NAME , KEY_IMGID , KEY_ANSWER , KEY_CORRECT , KEY_HINT , KEY_TRIES , KEY_LASTG }; 
	
	private static final String DATABASE_NAME = "Logo_db";
	private static final String DATABASE_TABLE = "logoTable";
	private static final int DATABASE_VERSION = 1;
	
	private DbHelper ourHelper;
	private final Context ourContext;
	private SQLiteDatabase ourDatabase;
	
	private static class DbHelper extends SQLiteOpenHelper {

		public DbHelper(Context context) {
			super(context, DATABASE_NAME,null, DATABASE_VERSION);
			// TODO Auto-generated constructor stub
			
		}

		@Override
		public void onCreate(SQLiteDatabase db) {
			// TODO Auto-generated method stub
		//	db.delete(DATABASE_TABLE, null, null);
			db.execSQL("DROP TABLE IF EXISTS " + DATABASE_TABLE);
			db.execSQL(
			"CREATE TABLE IF NOT EXISTS " + DATABASE_TABLE + " (" + 
			KEY_ROWID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
			KEY_TYPE + " TEXT DEFAULT ('notype'), " +
			KEY_POSITION + " INTEGER DEFAULT (0), " +
			KEY_NAME + " TEXT, " +
			KEY_IMGID + " INTEGER DEFAULT (0), " +
			KEY_ANSWER + " TEXT DEFAULT ('noanswer'), " +
			KEY_CORRECT + " INTEGER DEFAULT (0), " +
			KEY_HINT + " TEXT DEFAULT 'No hints', " +
			KEY_TRIES + " INTEGER DEFAULT '0', " +
			KEY_LASTG + " TEXT);"
					
			
			
			);
		}

		@Override
		public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
			// TODO Auto-generated method stub

			db.execSQL("DROP TABLE IF EXISTS " + DATABASE_TABLE);
			onCreate(db);
		}
		
		
	}
	
	/**
	 * Remove all users and groups from database.
	 */
	
	
	public LogoDatabase(Context c){
		ourContext = c;
	}
	
	public LogoDatabase open(){
		ourHelper = new DbHelper(ourContext);
		ourDatabase = ourHelper.getWritableDatabase();
		return this;
	}
	public void close (){
		ourHelper.close();
	}
	public String getData() {
		String[] columns = new String[]{ KEY_ROWID, KEY_NAME , KEY_IMGID , KEY_ANSWER , KEY_TYPE , KEY_CORRECT , 
				KEY_HINT , KEY_TRIES , KEY_LASTG };
		Cursor c = ourDatabase.query(DATABASE_TABLE,columns,null,null,null,null,null);
		String result = "";
		
		int iRow = c.getColumnIndex(KEY_ROWID);
		int iName = c.getColumnIndex(KEY_NAME);
		int iImgId = c.getColumnIndex(KEY_IMGID);
		int iAns = c.getColumnIndex(KEY_ANSWER);
		int iType = c.getColumnIndex(KEY_TYPE);
		int iCorrect = c.getColumnIndex(KEY_CORRECT);
		int iHint = c.getColumnIndex(KEY_HINT);
		int iTries = c.getColumnIndex(KEY_TRIES);
		int iLastG = c.getColumnIndex(KEY_LASTG);

		
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			result = result + c.getString(iRow) + " " + c.getString(iName) + " " + c.getInt(iImgId)
					 + " " + c.getString(iAns) + " " + c.getString(iType) + " " + c.getInt(iCorrect)
					 + " " + c.getString(iHint) + " " + c.getInt(iTries) + " " + c.getString(iLastG) +"\n";
		}
		return result;
	}
	public void addEntry(String name, int imgid, String type) throws SQLiteException{ // ** CHECK what throw for
	    ContentValues cv = new  ContentValues();
	//    cv.put(KEY_ROWID, rowid);
	    cv.put(KEY_NAME, name);
	    cv.put(KEY_IMGID, imgid);
	 //   cv.put(KEY_CORRECT, 0);
	    cv.put(KEY_TYPE, type);
	    ourDatabase.insert( DATABASE_TABLE, null, cv );
	}
	/*
	public String getData() {
		String[] columns = new String[]{ KEY_ROWID, KEY_IMGID, KEY_NAME , KEY_CORRECT , KEY_TYPE };
		Cursor c = ourDatabase.query(DATABASE_TABLE,columns,null,null,null,null,null);
		String result = "";
		
		int iRow = c.getColumnIndex(KEY_ROWID);
		int iImgId = c.getColumnIndex(KEY_IMGID);
		int iName = c.getColumnIndex(KEY_NAME);
	//	int iAns = c.getColumnIndex(KEY_ANSWER);
		int iCorrect = c.getColumnIndex(KEY_CORRECT);
		int iType = c.getColumnIndex(KEY_TYPE);
		
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			result = result + c.getString(iRow) + " " + c.getInt(iImgId) + " " + 
		c.getString(iName) + " " +  c.getInt(iCorrect) +" " +c.getString(iType) +"\n";
		}
		
		return result;
	}
	
	public void addEntry(int rowid, String name, int imgid, String type) throws SQLiteException{ // ** CHECK what throw for
	    ContentValues cv = new  ContentValues();
	//    cv.put(KEY_ROWID, rowid);
	    cv.put(KEY_NAME,    name);
	    cv.put(KEY_IMGID,   imgid);
	 //   cv.put(KEY_CORRECT, 0);
	    cv.put(KEY_TYPE, type);
	    ourDatabase.insert( DATABASE_TABLE, null, cv );
	}
	*/
	public void addImage( String name, int imgid) throws SQLiteException{ // ** CHECK what throw for
	    ContentValues cv = new  ContentValues();
	    cv.put(KEY_NAME,    name);
	    cv.put(KEY_IMGID,   imgid);
	    ourDatabase.insert( DATABASE_TABLE, null, cv );
	}
	public void delDatabase() {
		ourDatabase.delete(DATABASE_TABLE, null, null);
	}
	
	public int getImgById(int id) {
		String[] columns = new String[]{ KEY_ROWID, KEY_IMGID, KEY_NAME };
		Cursor c = ourDatabase.query(DATABASE_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iRow = c.getColumnIndex(KEY_ROWID);
		int iImgId = c.getColumnIndex(KEY_IMGID);
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			if(c.getInt(iRow) == id){
				return c.getInt(iImgId);
			}
		}
		return R.drawable.bpin_zahal;
	}
	
	
	public int getImgByString(String objString) {
		String[] columns = new String[]{ KEY_ROWID, KEY_IMGID, KEY_NAME };
		Cursor c = ourDatabase.query(DATABASE_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iImgId = c.getColumnIndex(KEY_IMGID);
		int iName = c.getColumnIndex(KEY_NAME);
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			if(c.getString(iName).equals(objString)){
				return c.getInt(iImgId);
			}
		}
		return R.drawable.bpin_zahal;
	}
	public String getNameById(int id) {
		String[] columns = new String[]{ KEY_ROWID, KEY_IMGID, KEY_NAME };
		Cursor c = ourDatabase.query(DATABASE_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iImgId = c.getColumnIndex(KEY_IMGID);
		int iName = c.getColumnIndex(KEY_NAME);
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			if(c.getInt(iImgId) == id) {
				return c.getString(iName);
			}
		}
		return "weird";
	}
	
	public void SetCorrectAns(int imgId) {
		String[] columns = new String[]{ KEY_ROWID, KEY_IMGID, KEY_NAME , KEY_CORRECT };
		Cursor c = ourDatabase.query(DATABASE_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iRow = c.getColumnIndex(KEY_ROWID);
		int iImgId = c.getColumnIndex(KEY_IMGID);
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			if(c.getInt(iImgId) == imgId){
				ContentValues cv = new  ContentValues();
				cv.put(KEY_CORRECT, 1);
				ourDatabase.update(DATABASE_TABLE, cv, KEY_ROWID + "=" + c.getInt(iRow), null);
			}
		}
	}
	
	public boolean CheckCorrectAns(int imgId) {
		String[] columns = new String[]{ KEY_ROWID, KEY_IMGID, KEY_NAME , KEY_CORRECT };
		Cursor c = ourDatabase.query(DATABASE_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iRow = c.getColumnIndex(KEY_ROWID);
		int iImgId = c.getColumnIndex(KEY_IMGID);
		int iCorrect = c.getColumnIndex(KEY_CORRECT);
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			if(c.getInt(iImgId) == imgId){
				if(c.getInt(iCorrect) == 1)
					return true;
			}
		}
		return false;
	}
	/* GET NUM OF PICTURES BY TYPE */
	
}
