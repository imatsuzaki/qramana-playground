import * as q from '@qramana/qramana';

const qubit = new q.Qubit({value: "|0>"});
console.log(qubit.measure()); 
