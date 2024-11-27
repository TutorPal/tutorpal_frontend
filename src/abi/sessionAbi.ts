export const sessionAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_tutorParmarket",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "SessionBooking__ContentCannotBeEmpty",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__IncorrectAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__InvalidInstructorAdderess",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__LessThanTenMintues",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__NotExceptedInstructor",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__NotExceptedStudent",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__NotOfferAccepted",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__NotStudent",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__OfferAccepted",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__OfferCanceled",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__PaymentFailed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__SessionAlreadyCompleted",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionBooking__TitleCannotBeEmpty",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionReview__InvalidInstructorAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionReview__InvalidReviewer",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SessionReview__SessionNotCompleted",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "student",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentRefunded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "instructor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentReleased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "instructor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "SessionAccepted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "listingId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "instructor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "name": "SessionListed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "student",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "instructor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            }
        ],
        "name": "SessionOffered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "instructor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "SessionRejected",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            }
        ],
        "name": "acceptSessionOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            }
        ],
        "name": "cancelSessionOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            }
        ],
        "name": "confirmSessionCompletion",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint32",
                "name": "duration",
                "type": "uint32"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "name": "createSessionListing",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            }
        ],
        "name": "getSessionOffer",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "offerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "student",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "isAccepted",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isCompleted",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "instructor",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "isCanceled",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ISessionBooking.SessionOffer",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "listingCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "listings",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "listingId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint32",
                "name": "duration",
                "type": "uint32"
            },
            {
                "internalType": "address",
                "name": "instructor",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "instructor",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            }
        ],
        "name": "makeSessionOffer",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "offerCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "offers",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "student",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isAccepted",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isCompleted",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "instructor",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isCanceled",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            }
        ],
        "name": "rejectOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "offerId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "instructor",
                "type": "address"
            }
        ],
        "name": "validateSessionReview",
        "outputs": [],
        "stateMutability": "view",
        "type": "function"
    }
]