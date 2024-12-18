use std::fs;
use std::io::{self, BufRead};
use std::collections::HashMap;

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

fn part_two(mut left: Vec<i32>, mut right: Vec<i32>) -> i32 {
    left.sort();
    right.sort();

    let mut right_count: HashMap<i32, i32> = HashMap::new();

    for &num in &right {
        *right_count.entry(num).or_insert(0) += 1;
    }

    let similarity_score: i32 = left
        .iter()
        .map(|&num| num * right_count.get(&num).unwrap_or(&0))
        .sum();

    similarity_score
}

fn main() -> io::Result<()> {
    let file_path = "./src/input.txt"; // Adjust the file path if needed

    let (left, right) = parse_file(file_path)?;

    let left_distance = left.clone();
    let right_distance = right.clone();
    let total_distance = calculate_total_distance(left_distance, right_distance);
    let similarity_score = part_two(left, right);

    println!("The total distance is: {}", total_distance);
    println!("The similarity score is: {}", similarity_score);

    Ok(())
}

