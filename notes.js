(function() {
  "use strict";

  var noteIndex = 0;
  var currentEditNoteId;
  var colors = ['#FFF', '#FFFFE0', '#90EE90', '#E0FFFF'];

  $('.js-new-note').click(function() {
    openModal('new');
  });
  $('.js-close-modal').click(closeModal);

  $('.js-create-note').click(function() {
    noteIndex++;

    $('.js-notes').append(noteContent(noteIndex));
    closeModal();
  });

  $(document).on('click', '.js-edit-note', function() {
    var note = $(this).closest('.js-note')
    var body = note.find('p').text();
    currentEditNoteId = note.data('id');
    openModal('edit', body);
  });

  $('.js-update-note').click(function() {
    $('[data-id=' + currentEditNoteId + ']').replaceWith(noteContent(currentEditNoteId));
    closeModal();
  });

  $(document).on('click', '.js-destroy-note', function() {
    if (confirm('Are you sure?')) {
      $(this).closest('.js-note').remove();
    }
  });

  function closeModal() {
    $('.js-edit-note-body').val('');
    $('.modal').removeClass('modal--open modal--edit modal--new');
  }

  function openModal(mode, noteBody) {
    $('.js-edit-note-body').val(noteBody);
    $('.modal').addClass('modal--open modal--' + mode);
  }

  function noteContent(noteIndex) {
    var body = $('.js-edit-note-body').val();
    var colorIndex = $('[name=color]:checked').data('colorIndex');

    return (
      '<div class="note js-note" data-id="' + noteIndex + '" style="background-color: ' + colors[colorIndex] + '">' +
        '<p class="js-note-body note__body">' + body + '</p>' +
        '<button class="js-edit-note button--mediumblue">Edit</button>' +
        '<button class="js-destroy-note button--red">Delete</button>' +
      '</div>'
    );
  }
})();
