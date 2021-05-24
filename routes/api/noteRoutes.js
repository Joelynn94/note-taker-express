const express = require('express');
const router = express.Router();

const Note = require('../../models/Note');

/**
 * get a all notes
 * @param {object} req
 * @param {object} res
 * @returns {array} notes array
 */
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.findAll();
    if (!notes) {
      res.status(404).json({ message: 'There are no notes' });
    }
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * get a note
 * @param {object} req
 * @param {object} res
 * @returns {object} note object
 */
router.get('/:id', async (req, res) => {
  try {
    // findByPK - obtains only a single entry from the table, using the provided primary key
    const noteData = await Note.findByPk(req.params.id);
    if (!noteData) {
      res.status(404).json({ message: 'No note with this id' });
    }
    res.status(200).json(noteData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/seed', async (req, res) => {
  try {
    const createNotes = await Note.bulkCreate([
      {
        title: 'Array.filter()',
        text: 'The .filter(callback) method expects a callback as the first argument. JavaScript will take your callback and call it for every single item in the array. If the callback function returns true, then the item will be included in the final array, if the callback returns false, then the item will **NOT** be included in the final array.',
      },
      {
        title: 'Array.find(callback)',
        text: 'When you call the .find(callback) method on an array, you will get back the first item that matches the condition that you specify. If no items were found, you will get back undefined. So the .find(callback) method will call the callback that you provided for every item in the array until one of the callbacks returns true.',
      },
      {
        title: 'Array.map(callback)',
        text: 'The .map(callback) method allows you to transform an array into another one. You always get back an array containing the same number of items compared to the original array, but every item has most likely undergone some transformation. If you forget the return inside the callback function, you will end up with undefined.',
      },
      {
        title: 'Array.includes(item)',
        text: 'The array .includes(item) method is one of the simplest array methods as it takes an item rather than a callback and returns true when that item exists in the array and false otherwise.',
      },
      {
        title: 'Array.join(glue)',
        text: "By default the array items are glued together with a comma , character. If you'd like to customize the glue, then you can use the .join(glue).",
      },
    ]);
    if (!createNotes) {
      res.status(404).json({ message: 'Failed to create notes' });
    }
    res.status(200).json('Notes created!');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
