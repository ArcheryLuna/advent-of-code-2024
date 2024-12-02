use std::fs;
use std::io::{self, BufRead};

fn parse_file(file_path: &str) -> io::Result<(Vec<i32>, Vec<i32>)> {
    let file = fs::File::open(file_path)?;
    let reader = io::BufReader::new(file);

    let mut left = Vec::new();
    let mut right = Vec::new();

    for line in reader.lines() {
        let line = line?;
        let numbers: Vec<i32> = line
            .split_whitespace()
            .filter_map(|s| s.parse::<i32>().ok())
            .collect();
        if numbers.len() == 2 {
            left.push(numbers[0]);
            right.push(numbers[1]);
        }
    }

    Ok((left, right))
}

fn calculate_total_distance(mut left: Vec<i32>, mut right: Vec<i32>) -> i32 {
    left.sort();
    right.sort();

    left.iter()
        .zip(right.iter())
        .map(|(l, r)| (l - r).abs())
        .sum()
}

fn main() -> io::Result<()> {
    let file_path = "./src/input.txt"; // Adjust the file path if needed

    let (left, right) = parse_file(file_path)?;
    let total_distance = calculate_total_distance(left, right);

    println!("The total distance is: {}", total_distance);

    Ok(())
}

