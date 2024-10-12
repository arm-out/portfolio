import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	// Project Count
	const projects = import.meta.glob('/src/projects/*.md');
	const projectCount = Object.keys(projects).length;

	// Age Calculation
	const dob = new Date('2001-08-24');
	const today = new Date();
	let age = today.getFullYear() - dob.getFullYear();
	const monthDifference = today.getMonth() - dob.getMonth();
	const dayDifference = today.getDate() - dob.getDate();
	if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
		age--;
	}

	return { projectCount, age };
};
