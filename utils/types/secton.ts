import { TBase } from '~/utils/types/index';

export type SectionDto = TBase & {
  team_id: string;
  name: string;
  description: string;
  section_id?: string;
};
export type TSection = TBase & {
  name: string;
  description: string;
  perent: TSection;
  child: TSection[];
};
export type SectionOneDto = {
  team_id: string;
  section_id: string;
};
