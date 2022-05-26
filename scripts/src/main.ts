import { build } from './runners/build';

const tasks = [
  {
    caseName: 'mwa-basic',
    runners: [build],
  },
  // {
  //   caseName: 'mwa-arco-pro',
  //   runners: [build],
  // },
];

async function main() {
  for (const task of tasks) {
    for (const runner of task.runners) {
      await runner(task.caseName);
    }
  }
}

main();
