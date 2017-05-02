import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Solution {

    public static void main(String args[])
    {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt(); // the number of temperatures to analyse
        //Variables declared here below
        int[] temps =  new int[n];
        int closest = 0;
        boolean loop = false;
        // DO I NEED THIS NEXT BLOCK??!!
        //if (in.hasNextLine())
        //{
        //    in.nextLine();
        //}
        //For loop here, to take the input from in.nextInt()
        for (int i = 0; i < n; i++)
        {
           //int closest = temps[0];
           temps[i] = in.nextInt();
           if (loop == false)
           {
           closest = Math.abs(temps[0]);
           loop = true;
           }

           if (n == 1)
           {
            closest = temps[0];
           }
           //System.err.println(temps[i]);

            if (closest > Math.abs(temps[i]))
            {
               closest = temps[i];
            }
        }
        for (int i = 0; i < n; i++){
        for (int j = i + 1; j < n; j++){
            if (temps[j] < 0 && temps[i] < 0 && temps[j] == temps[i]){
                closest = temps[i];
            }
            else if (Math.abs(temps[j])==Math.abs(temps[i])) {
                closest = Math.abs(temps[i]);
            }
        }
    }

        //String temps = in.nextLine(); // the n temperatures expressed as integers ranging from -273 to 5526

        // Write an action using System.out.println()
        // To debug: System.err.println("Debug messages...");
        System.err.println("Final Results: n = " + n);
        System.err.println("Temps are: ");
        for (int i = 0; i < n; i++)
        {
            System.err.println(temps[i]);
        }
        System.err.println("Closest to zero is " + closest);
        System.out.println(closest);
    }
}
