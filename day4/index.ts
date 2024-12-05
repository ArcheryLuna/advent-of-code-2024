import * as fs from 'fs';

type Direction = [number, number];

function read_word_search_matrix_from_file(file_path: string): string[][] {
    const file_content = fs.readFileSync(file_path, 'utf8');
    const lines = file_content.trim().split('\n');
    return lines.map(line => line.trim().split(''));
}

function count_xmas_occurrences(word_search_matrix: string[][], word_to_find: string): number {
    const rows = word_search_matrix.length;
    const cols = word_search_matrix[0].length;
    const word_length = word_to_find.length;
    let count = 0;

    const direction_offsets: Direction[] = [
        [0, 1],    // Right
        [1, 0],    // Down
        [0, -1],   // Left
        [-1, 0],   // Up
        [1, 1],    // Down-right diagonal
        [1, -1],   // Down-left diagonal
        [-1, 1],   // Up-right diagonal
        [-1, -1],  // Up-left diagonal
    ];

    const is_valid_position = (row: number, col: number): boolean => {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    };

    const matches_word_from_position = (row: number, col: number, direction: Direction): boolean => {
        for (let i = 0; i < word_length; i++) {
            const new_row = row + direction[0] * i;
            const new_col = col + direction[1] * i;

            if (
                !is_valid_position(new_row, new_col) || 
                word_search_matrix[new_row][new_col] !== word_to_find[i]
            ) {
                return false;
            }
        }
        return true;
    };

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (word_search_matrix[row][col] === word_to_find[0]) {
                for (const direction of direction_offsets) {
                    if (matches_word_from_position(row, col, direction)) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
}

function count_x_mas(grid: string[][]): number {
    let count = 0;

    function is_valid_coordinate(grid: string[][], row: number, col: number): boolean {
        return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
    }

    function check_diagonal_sequence(grid: string[][], center_row: number, center_col: number, 
                                     row_offset1: number, col_offset1: number, row_offset2: number, 
                                     col_offset2: number): boolean {

        const char_above = is_valid_coordinate(grid, center_row + row_offset1, center_col + col_offset1) 
            ? grid[center_row + row_offset1][center_col + col_offset1] 
            : null;
            const char_below = is_valid_coordinate(grid, center_row + row_offset2, center_col + col_offset2)
                ? grid[center_row + row_offset2][center_col + col_offset2]
                : null;

                if (!char_above || !char_below) {
                    return false;
                }

                if ((char_above === 'M' && char_below === 'S') || (char_above === 'S' && char_below === 'M')) {
                    return true;
                }

                return false;
    }


    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 'A') {
                const diagonal_1_valid = check_diagonal_sequence(grid, row, col, -1, -1, 1, 1);

                const diagonal_2_valid = check_diagonal_sequence(grid, row, col, -1, 1, 1, -1);

                if (diagonal_1_valid && diagonal_2_valid) {
                    count++;
                }
            }
        }
    }

    return count;
}

// Main Execution
const file_path = './input.txt'; // Path to the input file
const word_to_find = "XMAS";

try {
    const word_search_matrix = read_word_search_matrix_from_file(file_path);
    const count_of_xmas = count_xmas_occurrences(word_search_matrix, word_to_find);
    const count_xmas_pattern = count_x_mas(word_search_matrix);
    console.log(`Part One : ${count_of_xmas}`);
    console.log(`Part Two : ${count_xmas_pattern}`);
} catch (error) {
    console.error("Error processing the file:", error);
}

