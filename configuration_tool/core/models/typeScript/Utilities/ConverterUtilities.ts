import { FuseBit } from '../FuseBit';

export class ConverterUtilities {
    /**
     * Converte un numero esadecimale (string) in un numero in base decimale
     */
    static hexToDec(hex: string): number {
        return parseInt('0x' + hex);
    }

    /**
     * Converte un numero decimale in un numero esadecimale
     */
    static decToHex(n: number): string {
        return n.toString(16).toUpperCase();
    }

    /**
     * Trasposizione di una matrice, le righe diventano colonne e viceversa 
     */
    static matrixTranspose(a: any[][]) {
        // Calculate the width and height of the Array
        var w = a.length || 0;
        var h = a[0] instanceof Array ? a[0].length : 0;

        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) { return []; }
        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];

        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {
            // Insert a new row (array)
            t[i] = [];
            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {
                // Save transposed data.
                t[i][j] = a[j][i];
            }
        }
        return t;
    }


}
