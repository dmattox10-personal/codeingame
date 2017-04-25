-- Auto-generated code below aims at helping you parse
-- the standard input according to the problem statement.
-- ---
-- Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.

-- lightX: the X position of the light of power
-- lightY: the Y position of the light of power
-- initialTX: Thor's starting X position
-- initialTY: Thor's starting Y position
next_token = string.gmatch(io.read(), "[^%s]+")
lightX = tonumber(next_token())
lightY = tonumber(next_token())
initialTX = tonumber(next_token())
initialTY = tonumber(next_token())
    thorX = initialTX
    thorY = initialTY

-- game loop
while true do
    remainingTurns = tonumber(io.read()) -- The remaining amount of turns Thor can move. Do not remove this line.

                   xDir = ""
                   yDir = ""
           -- Write an action using System.out.println()
           -- To debug: System.err.println("Debug messages...");
            if (thorX > lightX) then --North

                xDir = "W"
                thorX = thorX - 1
               io.stderr:write("West")

            elseif (thorX < lightX) then-- South

                xDir = "E"
                thorX = thorX + 1
                io.stderr:write("East")
            end

            if (thorY > lightY) then-- East

                yDir = "N"
                thorY = thorY - 1
                io.stderr:write("North")

            elseif (thorY < lightY) then-- West

                yDir = "S"
                thorY = thorY + 1
                io.stderr:write("South")
            end

       -- yDir.concat(xDir)

          print(yDir .. xDir)

       end

    -- Write an action using print()
    -- To debug: io.stderr:write("Debug message\n")


    -- A single line providing the move to be made: N NE E SE S SW W or NW
    ---print("SE")
--end
