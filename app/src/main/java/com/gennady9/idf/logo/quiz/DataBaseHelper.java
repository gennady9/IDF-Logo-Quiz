package com.gennady9.idf.logo.quiz;

import android.annotation.SuppressLint;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.database.sqlite.SQLiteOpenHelper;


import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class DataBaseHelper extends SQLiteOpenHelper{
 
    //The Android's default system path of your application database.
    private static String DB_PATH = "/data/data/com.gennady9.idf.logo.quiz/databases/";
 	//Log.d("db_helper_path",Context.getFilesDir().getPath() );
    private static String DB_NAME = "FullDB.db";
    private static String DB_TABLE = "ReadTable";
 
    private SQLiteDatabase myDataBase; 
 
    private final Context myContext;
 
	private static final String KEY_ROWID = "_id";
	private static final String KEY_TYPE = "img_type";
	private static final String KEY_POSITION = "position";
	private static final String KEY_NAME = "img_name";
	private static final String KEY_EXTEND = "extend";
	private static final String KEY_ANSWER = "answer";
	private static final String KEY_CORRECT = "correct";
	private static final String KEY_HINT = "hint";
	private static final String KEY_TRIES = "tries";
	private static final String KEY_LASTG = "last_try";
    
    /**
     * Constructor
     * Takes and keeps a reference of the passed context in order to access to the application assets and resources.
     * @param context - the current context
     */
    public DataBaseHelper(Context context) {
 
    	super(context, DB_NAME, null, 1);
        this.myContext = context;
//		Log.d("db_helper_path",context.getFilesDir().getPath()); // TODO: consider getting path automatically (using getPath)
//		Log.d("db_helper_path",DB_PATH);
    }	
 
  /**
     * Creates a empty database on the system and rewrites it with your own database.
     * */
    public void createDataBase(){

    	boolean dbExist = checkDataBase();
    	if(!dbExist) {
			//By calling this method and empty database will be created into the default system path
			//of your application so we are gonna be able to overwrite that database with our database.
			this.getReadableDatabase();
			this.close();
			try { copyDataBase(); } catch (IOException e) { throw new Error("Error copying database at createDataBase"); }
		}
    }
 
    /**
     * Check if the database already exist to avoid re-copying the file each time you open the application.
     * @return true if it exists, false if it doesn't
     */
    private boolean checkDataBase(){
 
    	SQLiteDatabase checkDB = null;
 
    	try{
    		String myPath = DB_PATH + DB_NAME;
    		checkDB = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READONLY);
 
    	}catch(SQLiteException e){
           // Log.e("DB","DEBUG_GENNA - CANT OPEN DATABASE");
    		//database does't exist yet.
 
    	}
 
    	if(checkDB != null){
 
    		checkDB.close();
 
    	}
 
    	return (checkDB != null);
    }
 
    /**
     * Copies your database from your local assets-folder to the just created empty database in the
     * system folder, from where it can be accessed and handled.
     * This is done by transfering bytestream.
     * */
    private void copyDataBase() throws IOException{
 
    	//Open your local db as the input stream
    	InputStream myInput = myContext.getAssets().open(DB_NAME);
 
    	// Path to the just created empty db
    	String outFileName = DB_PATH + DB_NAME;
 
    	//Open the empty db as the output stream
    	OutputStream myOutput = new FileOutputStream(outFileName);
 
    	//transfer bytes from the inputfile to the outputfile
    	byte[] buffer = new byte[1024];
    	int length;
    	while ((length = myInput.read(buffer))>0){
    		myOutput.write(buffer, 0, length);
    	}
 
    	//Close the streams
    	myOutput.flush();
    	myOutput.close();
    	myInput.close();
 
    }
 
    public void openDataBase() throws SQLException{
    	//Open the database
        String myPath = DB_PATH + DB_NAME;
    	myDataBase = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READWRITE);
    }
 
    @Override
	public synchronized void close() {
		if(myDataBase != null)
			myDataBase.close();

		super.close();
	}
 

	@Override
	public void onCreate(SQLiteDatabase arg0) {
	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
	//	if(newVersion>oldVersion)
	//		copyDataBase();
		
	}

	
	public Integer[] getImgIdArray(Context context , String type) {
		String[] columns = new String[]{ KEY_ROWID , KEY_TYPE , KEY_POSITION , KEY_NAME};
		Cursor c = myDataBase.query(DB_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iType = c.getColumnIndex(KEY_TYPE);
		int iPosition = c.getColumnIndex(KEY_POSITION);
		int iName = c.getColumnIndex(KEY_NAME);
		int num = 0;
		int parsepos;
		
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()){
		String[] types = c.getString(iType).split(",");
		parsepos = 0;
		if(types.length > 1){
			for(int i=0; i<types.length; i++){
				if(types[i].equals(type)){
					String[] positions = c.getString(iPosition).split(","); 
					if(positions.length > 1){
						try {parsepos = Integer.parseInt(positions[i]);
						} catch(NumberFormatException nfe) {System.out.println("Could not parse " + nfe);}
					}
				}
			}
		}
		else{
		if(types[0].equals(type)){
			try {parsepos = Integer.parseInt(c.getString(iPosition));
			} catch(NumberFormatException nfe) {System.out.println("Could not parse " + nfe);}
		}
		}
		if(parsepos != 0)
			num++;
	}

		if(num==0)
			return null;
		Integer[] IdArr = new Integer[num];
		for(int i=0; i<num; i++)
			IdArr[i] = 0;
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()){
		String[] types = c.getString(iType).split(",");
		parsepos = 0;
		if(types.length > 1){
			for(int i=0; i<types.length; i++){
				if(types[i].equals(type)){
					String[] positions = c.getString(iPosition).split(","); 
					if(positions.length > 1){
						try {parsepos = Integer.parseInt(positions[i]);
						} catch(NumberFormatException nfe) {System.out.println("Could not parse " + nfe);}
					}
				}
			}
		}
		else{
			if(types[0].equals(type)){
				try {parsepos = Integer.parseInt(c.getString(iPosition));
				} catch(NumberFormatException nfe) {System.out.println("Could not parse " + nfe);}
			}
		}
		if(parsepos != 0)
			IdArr[parsepos - 1] =
			context.getResources().getIdentifier(c.getString(iName), "drawable" , context.getPackageName());
	}
		c.close();
		return IdArr;
	}	

	public String getImgAnswer(String name) {
		String[] columns = new String[]{ KEY_ROWID , KEY_TYPE , KEY_POSITION , KEY_NAME , KEY_EXTEND , KEY_ANSWER , KEY_CORRECT , KEY_HINT , KEY_TRIES , KEY_LASTG };
		Cursor c = myDataBase.query(DB_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iName = c.getColumnIndex(KEY_NAME);
		int iAnswer = c.getColumnIndex(KEY_ANSWER);
		String Answer = "null";
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()){
			if(c.getString(iName).equals(name))
				Answer = c.getString(iAnswer);
		}
		c.close();
		return Answer;
	}	
	
	public String getExtend(String Type, String name) {
		String[] columns = new String[]{ KEY_TYPE, KEY_NAME , KEY_EXTEND };
		Cursor c = myDataBase.query(DB_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iType = c.getColumnIndex(KEY_TYPE);
		int iName = c.getColumnIndex(KEY_NAME);
		int iExtend = c.getColumnIndex(KEY_EXTEND);
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()){
			if(c.getString(iType).equals(Type)){
				if(c.getString(iName).equals(name)){
					String Extend = c.getString(iExtend);
					c.close();
					return Extend;
				}
			}
		}
		c.close();
		return null;
	}	

	public boolean CheckCorrectAns(String name) {
		String[] columns = new String[]{ KEY_ROWID , KEY_NAME , KEY_EXTEND , KEY_CORRECT};
		Cursor c = myDataBase.query(DB_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iName = c.getColumnIndex(KEY_NAME);
		int iCorrect = c.getColumnIndex(KEY_CORRECT);
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			if(c.getString(iName).equals(name))  return (c.getInt(iCorrect) == 1);
		}
		c.close();
		return false;
	}
	
	@SuppressLint("NewApi")
	public int getState(String Type, String name) {
		// Returning the state of the image:
		// -1 - Not found
		// 0 - Not guessed, Can't extend
		// 1 - Guessed , Can't extend
		// 2 - Extended, Not guessed
		// 3 - Extend, all of the extended images are guessed correctly
		
		String[] columns = new String[]{ KEY_TYPE, KEY_NAME , KEY_EXTEND , KEY_CORRECT};
		Cursor c = myDataBase.query(DB_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iName = c.getColumnIndex(KEY_NAME);
		int iType = c.getColumnIndex(KEY_TYPE);
		int iCorrect = c.getColumnIndex(KEY_CORRECT);
		int iExtend = c.getColumnIndex(KEY_EXTEND);
		int ret = 0;
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			if(c.getString(iType).equals(Type)){
				if(c.getString(iName).equals(name)){
					if(c.getString(iExtend) == null || c.getString(iExtend).isEmpty() || c.getString(iExtend).equals("")){ // Not Extended + CHECK FOR CRASHING
						if(c.getInt(iCorrect) == 1)
							ret = 1;
					}
					else{ // Extended
						if(CheckTypeCorrect(c.getString(iExtend))){ // Extend,correct = State 3
							ret = 3;
						}
						else{ // Extend, not correct = State 2
							ret = 2;
						}
					}
				return ret;
				}
			}
		} // close loop
		c.close();
		return -1; // Not found any images
	}
	
	public boolean CheckTypeCorrect(String type) {
		String[] columns = new String[]{ KEY_TYPE , KEY_NAME , KEY_CORRECT};
		Cursor c = myDataBase.query(DB_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		//int iName = c.getColumnIndex(KEY_NAME);
		int iType = c.getColumnIndex(KEY_TYPE);
		int iCorrect = c.getColumnIndex(KEY_CORRECT);
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			if(c.getString(iType).equals(type)){
				if(c.getInt(iCorrect) != 1)
					return false;
			}
		}
		c.close();
		return true;
	}
	
	public void SetCorrectAns(String name) {
		String[] columns = new String[]{ KEY_ROWID , KEY_TYPE , KEY_POSITION , KEY_NAME , KEY_EXTEND , KEY_ANSWER , KEY_CORRECT , KEY_HINT , KEY_TRIES , KEY_LASTG };
		Cursor c = myDataBase.query(DB_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
		int iRow = c.getColumnIndex(KEY_ROWID);
		int iName = c.getColumnIndex(KEY_NAME);
		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			if(c.getString(iName).equals(name)){
				ContentValues cv = new  ContentValues();
				cv.put(KEY_CORRECT, 1);
				myDataBase.update(DB_TABLE, cv, KEY_ROWID + "=" + c.getInt(iRow), null);
			}
		}
		c.close();
	}
	
}


/*	CODE GRAVEYARD
	public Cursor RetCursor() {
		String[] columns = new String[]{ KEY_ROWID , KEY_TYPE , KEY_POSITION , KEY_NAME , KEY_EXTEND , KEY_ANSWER , KEY_CORRECT , KEY_HINT , KEY_TRIES , KEY_LASTG };
		Cursor c = myDataBase.query(DB_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
	return c;
	}
	public Cursor RetCursor(String[] columns) {
		Cursor c = myDataBase.query(DB_TABLE,columns,null,null,null,null,null);
		c.moveToFirst();
	return c;
	}



	/*
	public String getData() {
		String[] columns = new String[]{ KEY_ROWID , KEY_TYPE , KEY_POSITION , KEY_NAME , KEY_EXTEND , KEY_ANSWER , KEY_CORRECT , KEY_HINT , KEY_TRIES , KEY_LASTG };

		Cursor c = myDataBase.query(DB_TABLE,columns,null,null,null,null,null);
		String result = "";

		int iRow = c.getColumnIndex(KEY_ROWID);
		int iName = c.getColumnIndex(KEY_NAME);
		int iExtend = c.getColumnIndex(KEY_EXTEND);
		int iAns = c.getColumnIndex(KEY_ANSWER);
		int iType = c.getColumnIndex(KEY_TYPE);
		int iCorrect = c.getColumnIndex(KEY_CORRECT);
		int iHint = c.getColumnIndex(KEY_HINT);
		int iTries = c.getColumnIndex(KEY_TRIES);
		int iLastG = c.getColumnIndex(KEY_LASTG);


		for(c.moveToFirst(); !c.isAfterLast(); c.moveToNext()) {
			result = result + c.getString(iRow) + " " + c.getString(iName) + " " + c.getString(iExtend)
					 + " " + c.getString(iAns) + " " + c.getString(iType) + " " + c.getInt(iCorrect)
					 + " " + c.getString(iHint) + " " + c.getInt(iTries) + " " + c.getString(iLastG) +"\n";
		}
		return result;
	}
*/



