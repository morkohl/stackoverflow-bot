const chai = require('chai');
const expect = chai.expect;
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
                expect(parsedCommand.args).to.equal('how to sort arrays?');
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

                it('should return undefined', async () => {
                    const parsedCommand = await commandParser.find(discordMessageMock);
                    expect(parsedCommand).to.equal(undefined);
                })
            });

            describe('False command name', () => {
                let discordMessageMock;
                before(async () => {
                    discordMessageMock = {
                        content: `${prefix}nonexistantcommand`
                    }
                });

                it('should return undefined', async () => {
                    const parsedCommand = await commandParser.find(discordMessageMock);
                    expect(parsedCommand).to.equal(undefined);
                })
            });
        })
    });
});