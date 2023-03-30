export const getEnvironments = () => {
	// cargar env
	const env = import.meta.env;

	return {
		...env,
	};
};
