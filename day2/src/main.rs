use std::fs;
use std::io;

fn is_safe_report(report: &Vec<i32>) -> bool {
    let diffs: Vec<i32> = report.windows(2)
        .map(|pair| pair[1] - pair[0])
        .collect();

    // Check if all differences are within the range [1, 3]
    if diffs.iter().any(|&diff| diff.abs() < 1 || diff.abs() > 3) {
        return false;
    }

    // Check if all differences are consistently positive or negative
    let all_increasing = diffs.iter().all(|&diff| diff > 0);
    let all_decreasing = diffs.iter().all(|&diff| diff < 0);

    all_increasing || all_decreasing
}

fn main() -> io::Result<()> {
    // Read the entire input file into a string
    let contents = fs::read_to_string("src/input.txt")?;
    
    // Parse the input into a vector of reports
    let reports: Vec<Vec<i32>> = contents.lines()
        .map(|line| {
            line.split_whitespace()
                .filter_map(|num| num.parse::<i32>().ok())
                .collect()
        })
        .collect();

    // Count the number of safe reports
    let safe_count = reports.iter().filter(|report| is_safe_report(report)).count();

    println!("Number of safe reports: {}", safe_count);

    Ok(())
}

