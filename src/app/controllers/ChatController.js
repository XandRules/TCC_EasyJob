class ChatController {
  async index(req, res) {
    res.send('server is running');
  }
}

export default new ChatController();
