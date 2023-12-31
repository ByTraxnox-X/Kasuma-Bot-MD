let handler = async (m, { conn, args, usedPrefix, command }) => {
 
//import java.util.Scanner;

public class JuegoAventura {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("¡Bienvenido a la aventura para rescatar a la princesa!");
        System.out.println("Tu misión es encontrar y rescatar a la princesa del malvado dragón.");

        System.out.println("¿Deseas entrar al castillo? (si/no)");
        String decision = scanner.nextLine();

        if (decision.equalsIgnoreCase("si")) {
            System.out.println("Has entrado al castillo. Encuentras un pasillo oscuro. ¿Deseas avanzar? (si/no)");
            decision = scanner.nextLine();
            if (decision.equalsIgnoreCase("si")) {
                System.out.println("En el pasillo encuentras una puerta. Abres la puerta y encuentras al dragón.");
                System.out.println("El dragón te reta a un juego de adivinanzas. Si adivinas la respuesta correcta, podrás rescatar a la princesa.");
                System.out.println("¿Qué tienes en tus bolsillos? (pista: algo que comienza con la letra 'll')");
                String respuesta = scanner.nextLine();
                if (respuesta.equalsIgnoreCase("llaves")) {
                    System.out.println("¡Correcto! Has rescatado a la princesa. ¡Felicidades!");
                } else {
                    System.out.println("Respuesta incorrecta. El dragón te ha capturado. Fin del juego.");
                }
            } else {
                System.out.println("Decides no avanzar. Fin del juego.");
            }
        } else {
            System.out.println("Decides no entrar al castillo. Fin del juego.");
        }
    }
}

 
}
handler.help = ['princesa2']
handler.tags = ['game']
handler.command = /^((princesa2|princesa22)?)$/i

export default handler
