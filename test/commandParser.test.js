const chai = require('chai');
const expect = chai.expect;
const CommandError = require('../src/error/CommandError');
const prefix = require('../src/config').discord.prefix;

const commandParser = require('../src/commands/commandParser');


describe('CommandExecutor', () => {
    describe('Command parsing', () => {
        describe('Valid command', () => {
            let discordMessageMock;
            before(async () => {
                discordMessageMock = {
                    content: `${prefix}stackoverflow how to sort arrays?`
                }
            });

            it('should find a command', async () => {
                const parsedCommand = await commandParser.find(discordMessageMock);
                expect(parsedCommand).to.not.equal(undefined);
            });

            it('should find the correct command', async () => {
                const parsedCommand = await commandParser.find(discordMessageMock);
                expect(parsedCommand.command.name).to.equal('stackoverflow');
            });

            it('should get the command arguments', async() => {
                const parsedCommand = await commandParser.find(discordMessageMock);
                expect(parsedCommand.suppliedArgs).to.equal('how to sort arrays?');
            } )
        });

        describe('Invalid command', () => {
            describe('False prefix', () => {
                let discordMessageMock;
                before(async () => {
                    discordMessageMock = {
                        content: 'FALSE_PREFIX!!stackoverflow'
                    }
                });

                it('should throw a command error', async () => {
                    try {
                        await commandParser.find(discordMessageMock);
                        throw new Error("No error thrown as expected!");
                    } catch(err) {
                        expect(err).to.be.an.instanceof(CommandError)
                    }
                })
            });

            describe('False command name', () => {
                let discordMessageMock;
                before(async () => {
                    discordMessageMock = {
                        content: `${prefix}nonexistantcommand`
                    }
                });

                it('should throw a command error', async () => {
                    try {
                        await commandParser.find(discordMessageMock);
                        throw new Error("No error thrown as expected!");
                    } catch(err) {
                        expect(err).to.be.an.instanceof(CommandError)
                    }
                })
            });

            describe('No command name', () => {
                let discordMessageMock;
                before(async () => {
                    discordMessageMock = {
                        content: prefix
                    }
                });

                it('should throw a command error', async () => {
                    try {
                        await commandParser.find(discordMessageMock);
                        throw new Error("No error thrown as expected!");

                    } catch(err) {
                        expect(err).to.be.an.instanceof(CommandError)
                    }
                })
            });
        })
    });
});