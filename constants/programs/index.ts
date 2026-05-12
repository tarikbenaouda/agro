import oliveProgram from './olive';
import orangeProgram from './orange';
import { ProgramDay, TreeId } from '@/types';

const programs: Record<TreeId, Record<string, ProgramDay>> = {
  olive: oliveProgram,
  orange: orangeProgram,
};

export { oliveProgram, orangeProgram };
export default programs;
