const chalk = require('chalk')
const { Command } = require('commander')
const {listContacts, getContactById, removeContact, addContact} = require('./contacts')

const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
          const contacts = await listContacts()
          console.table(contacts);
      break;

    case 'get':
          const contactByID = await getContactById(id)
          if (contactByID) {
            console.log(chalk.green('Contact found'));
            console.log(contactByID);
            return
          } 
            console.log(chalk.yellow('Contact not found'));
      break;

    case 'add':
          const contact = await addContact(name, email, phone)
          console.log(chalk.green('Add new contact'));
          console.log(contact);
      break;

    case 'remove':
          const removeContactById = await removeContact(id)
          console.log(removeContactById);
      break;

    default:
      console.warn(chalk.red('Unknown action type!'));
  }
}

invokeAction(argv).then(() => console.log(chalk.green('Operation success')));