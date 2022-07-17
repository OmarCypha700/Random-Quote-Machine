import React, { Component } from 'react'
import { Icon } from '@iconify/react';
import twitterSquare from '@iconify/icons-fa6-brands/twitter-square';
import quoteLeft from '@iconify/icons-bxs/quote-left';
import './App.css';

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

class App extends Component {
  state = {
    quotes: [
      {
        "quote": "Life isn’t about getting and having, it’s about giving and being.",
        "author": "Kevin Kruse"
      },
    ],
    index: 0
  }

  componentDidMount() {
    // API call
    fetch(API)
      .then(res => res.json())
      .then(res => {
        this.setState({
          quotes: res.quotes
        }, this.getRandomIndex);
      });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length)
      this.setState({
        index
      })
    }
  }

  render() {

    const { quotes, index } = this.state;
    const quote = quotes[index];
    // Share-quote links
    const tweetURL = `https://twitter.com/intent/tweet?text=${'"' + quote.quote + '" '}-${quote.author}`
    const whatsAppURL = `whatsapp://send?text=${'"' + quote.quote + '" '}-${quote.author}`

    return (
      <div>
        <div
          id='quote-box'
          className="quote-box">
          <Icon icon={quoteLeft} color="#e74c3c" width="40" height="40" />
          {
            quote && (
              <div>
                <p id='text'>{quote.quote}</p>
                <cite
                  className='float-end'
                  id='author'>
                  - {quote.author}
                </cite>
                <br />
                <br />
              </div>
            )
          }
          <div className="buttons">

            <a
              href={whatsAppURL}
              rel="noreferrer"
              target='_blank'>
              <Icon icon="bxl:whatsapp-square" color="#e74c3c" width="55" height="60" />
            </a>

            <a
              href={tweetURL}
              rel="noreferrer"
              target='_blank'>
              <Icon icon={twitterSquare} color="#e74c3c" width="50" height="50" />
            </a>
            <button
              id='new-quote'
              className='new-quote'
              onClick={this.getRandomIndex}>
              New Quote
            </button>
          </div>
        </div>
        <br />
        <h4>by Omar Cypha</h4>

      </div>
    );
  }
}

export default App; 
