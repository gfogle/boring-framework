#!/usr/bin/env node

const InterpreterContext = require("./InterpreterContext");
const ServerExpression = require("./expressions/ServerExpression");
const NewExpression = require("./expressions/NewExpression");
const GenerateControllerExpression = require("./expressions/GenerateControllerExpression");
const GenerateActionExpression = require("./expressions/GenerateActionExpression");
const RoutesExpression = require("./expressions/RoutesExpression");
const GenerateModelExpression = require("./expressions/GenerateModelExpression");

(async () => {
  try {
    const context = new InterpreterContext(process.argv);

    const tree = [];
    tree.push(new ServerExpression());
    tree.push(new NewExpression());
    tree.push(new GenerateControllerExpression());
    tree.push(new GenerateActionExpression());
    tree.push(new GenerateModelExpression());
    tree.push(new RoutesExpression());

    tree.forEach(expression => expression.interpret(context));

    const command = context.getOutput();
    command.execute(context);
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
})();

// switch (cmd) {
//   case "generate":
//     generate();
//     break;
//   case "migrate":
//     migrateDatabase();
//     break;
//   case "routes":
//     showRoutes();
//     break;
//   case "test":
//     runTests();
//     break;
//   default:
//     console.error(`Unknown command ${cmd} and args phrase`);
//     process.exit(1);
// }

// function generate() {
//   try {
//     if (!args[1]) {
//       throw new Error("nothing to generate");
//     }

//     switch (args[1]) {
//       case "migration":
//         generateMigration();
//         break;
//       default:
//         console.error(`Unknown argument ${args[1]} for generate command`);
//         process.exit(1);
//     }
//   } catch (ex) {
//     console.error(`Error generating: ${ex.message}`);
//     process.exit(1);
//   }
// }

// function generateMigration() {
//   try {
//     const fileName = args[2];

//     require("./generate/migration")(dir, fileName);
//   } catch (ex) {
//     console.error(`Error creating a migration: ${ex.message}`);
//     process.exit(1);
//   }
// }

// function migrateDatabase() {
//   try {
//     const direction = args[1];
//     const db = require(`${dir}/db`);

//     if (direction === "up") {
//       db.migrate
//         .latest({
//           directory: `${dir}/db/migrations`
//         })
//         .then(function() {
//           console.log(`Done migrating db`);
//           process.exit(0);
//         });
//     } else if (direction === "down") {
//       db.migrate
//         .rollback({
//           directory: `${dir}/db/migrations`
//         })
//         .then(function() {
//           console.log(`Done rolling back db`);
//           process.exit(0);
//         });
//     } else {
//       throw new Error(`migration direction of ${direction} is not supported.`);
//     }
//   } catch (ex) {
//     console.error(`Error migrating db: ${ex.message}`);
//     process.exit(1);
//   }
// }

// function showRoutes() {
//   try {
//     require("./routes")();
//   } catch (ex) {
//     console.error(`Error building routes: ${ex.message}`);
//     process.exit(1);
//   }
// }

// function runTests() {
//   try {
//     spawnSync(
//       `./node_modules/.bin/jest --forceExit --coverage --runInBand test`,
//       {
//         stdio: `inherit`,
//         shell: true,
//         cwd: dir
//       }
//     );
//   } catch (ex) {
//     console.error(`Error running tests: ${ex.message}`);
//     process.exit(1);
//   }
// }
