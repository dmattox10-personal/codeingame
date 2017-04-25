import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/
class Player {

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        int lightX = in.nextInt(); // the X position of the light of power
        int lightY = in.nextInt(); // the Y position of the light of power
        int initialTX = in.nextInt(); // Thor's starting X position
        int initialTY = in.nextInt(); // Thor's starting Y position
        String direction = "";
        int thorX = initialTX;
        int thorY = initialTY;

        // game loop
        while (true) {
            int remainingTurns = in.nextInt(); // The remaining amount of turns Thor can move. Do not remove this line.


            String xDir = "";
            String yDir = "";
            // Write an action using System.out.println()
            // To debug: System.err.println("Debug messages...");
            if (thorX > lightX) // North
            {
                xDir = "W";
                thorX = thorX - 1;
                System.err.println("West");
            }

            else if (thorX < lightX) // South
            {
                xDir = "E";
                thorX = thorX + 1;
                System.err.println("East");
            }

            if (thorY > lightY) // East
            {
                yDir = "N";
                thorY = thorY - 1;
                System.err.println("North");
            }

            else if (thorY < lightY) // West
            {
                yDir = "S";
                thorY = thorY + 1;
                System.err.println("South");
            }

            direction = yDir + xDir;

            // A single line providing the move to be made: N NE E SE S SW W or NW
            System.out.println(direction);
            System.err.println(direction);
        }
    }
}
