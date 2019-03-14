const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
	const notes = loadNotes();

	const duplicateNote = notes.find((note) => note.title === title);

	if(duplicateNote){
		console.log(chalk.yellow.bold.inverse("Oops! Note title already in use."));
	} else {
		const newNote = {
			title: title,
			body: body
		}
		notes.push(newNote);
		saveNotes(notes);
		console.log(chalk.green.bold.inverse("New note added."));
	}
}

const loadNotes = () => {
	try {
		const notesBuffer =  fs.readFileSync("notes.json");
		const notesJson = JSON.parse(notesBuffer.toString());
		return notesJson
	} catch (err) {
		return []
	}
}

const removeNote = (title) => {
	const notes = loadNotes();
	const newNotes = notes.filter((note) => !(note.title === title));
	
	if(notes.length > newNotes.length) {
		saveNotes(newNotes);
		console.log(chalk.green.bold.inverse("Note removed succesfully"));
	}else {
		console.log(chalk.red.bold.inverse(`No note found with title '${title}'`));
	}
}

const readNote = (title) => {
	const notes = loadNotes();
	const note = notes.find((note) => {
		return note.title === title
	});
	if(note){
		console.log(chalk.yellow.bold(note.title));
		console.log(chalk.white(note.body));
	}else {
		console.log(chalk.red.bold.inverse(`No note found with title '${title}'`))
	}
}

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.underline.yellow.bold("Your Notes"));
	notes.forEach((note) => {
		console.log(chalk.white(note.title));
	});
}

const saveNotes = (notes) => {
	fs.writeFileSync("notes.json", JSON.stringify(notes));
}

module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
};
