import Exceljs from "exceljs";
import { writeFile } from "fs/promises";
import { ProcessError } from "./errors.js";
import pkg from "prettier";
const { format, resolveConfig } = pkg;

const args = process.argv.slice(2);

const QUESTIONS = "questions";

run(...args)
  .then(() => {
    console.log("done");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(err.code);
  });

async function run(filename = "./src/Questions.xlsx", resultDir = "./") {
  if (!filename) {
    throw new ProcessError("No filename provided");
  }
  if (!resultDir) {
    throw new ProcessError("No result directory provided");
  }

  const workbook = new Exceljs.Workbook();
  await workbook.xlsx.readFile(filename);
  const questions = {};
  let group = 1;
  const sheet = workbook.getWorksheet("groups");
  const columns = sheet.columns.slice(0, sheet.columnCount);
  const headerNames = columns.map((col) =>
    col?.values?.[1]?.toString()?.trim()
  );
  const rows = sheet.getRows(2, sheet.rowCount - 1);

  const questionIndex =
    headerNames.findIndex((name) => name === "question") + 1;
  const option1Index = headerNames.findIndex((name) => name === "option1") + 1;
  const option2Index = headerNames.findIndex((name) => name === "option2") + 1;
  const option3Index = headerNames.findIndex((name) => name === "option3") + 1;
  const option4Index = headerNames.findIndex((name) => name === "option4") + 1;

  rows
    ?.filter((row) => row.getCell(1).text.trim() !== "")
    .forEach((row) => {
      const question = {
        question: row.getCell(questionIndex).text,
        options: [
          { label: row.getCell(option1Index).text, isCorrect: true },
          { label: row.getCell(option2Index).text, isCorrect: false },
          { label: row.getCell(option3Index).text, isCorrect: false },
          { label: row.getCell(option4Index).text, isCorrect: false },
        ],
      };
      if (!questions[`group${group}`]) {
        questions[`group${group}`] = [];
        questions[`group${group}`].push(question);
      } else {
        questions[`group${group}`].push(question);
        if (questions[`group${group}`]?.length === 10) {
          group++;
        }
      }
    });
  const content = `export const questions = ${JSON.stringify(
    questions,
    null,
    2
  )}`;
  const filePath = `${resultDir}/questions.js`;
  const options = await resolveConfig(filePath);
  await writeFile(
    filePath,
    format(content, { parser: "typescript", ...options })
  );
}
