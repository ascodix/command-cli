import { Project } from '../../src/core';

describe('Project', () => {

    let project: Project;

    beforeEach(() => {
        project = new Project();
    });

    it('Instanciation de la configuration', () => {
        project.name = 'nom';
        expect(project).toBeDefined();
        expect(project.name).toEqual('nom');
    });

});
