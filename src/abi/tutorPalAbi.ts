export const tutorPalAbi = [
    {
        "inputs": [],
        "name": "CourseReview_NotOwned",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "NotANewUser",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotAdmin",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotInstuctor",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotStudent",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__CourseSoldOut",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__EmptyMetadataURI",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__EmptySymbol",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__EmptyTitle",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__InsufficientPayment",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "courseId",
                "type": "uint256"
            }
        ],
        "name": "TutorPal__InvalidCourseId",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__InvalidInstructor",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__InvalidMaxSupply",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__InvalidPrice",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__InvalidRating",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__InvalidRoyalty",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TutorPal__PaymentFailed",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "courseAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "courseId",
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
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "maxSupply",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "royalties",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "CourseListed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "courseAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "NFTPurchased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newAdminAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "admin",
                "type": "address"
            }
        ],
        "name": "NewAdmin",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "removedAdmin",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "admin",
                "type": "address"
            }
        ],
        "name": "RemovedAdmin",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "displayName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "enum IDecentralizedProfiles.RoleType",
                "name": "roleType",
                "type": "uint8"
            }
        ],
        "name": "UserRegistered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "ValidInstructor",
        "outputs": [],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "ValidStudent",
        "outputs": [],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "admin_",
                "type": "address"
            }
        ],
        "name": "addAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "admins",
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
        "name": "allCourses",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_courseId",
                "type": "uint256"
            }
        ],
        "name": "buyCourse",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "courseStructs",
        "outputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "metadataURI",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "instructor",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "royalties",
                "type": "uint16"
            },
            {
                "internalType": "uint256",
                "name": "maxSupply",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalMinted",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "contract Course",
                "name": "course",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "rating",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_metadataURI",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_maxSupply",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            },
            {
                "internalType": "uint16",
                "name": "_royalty",
                "type": "uint16"
            }
        ],
        "name": "createCourse",
        "outputs": [
            {
                "internalType": "contract Course",
                "name": "newCourse",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "currentId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "createCourseCount",
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
        "inputs": [],
        "name": "getAllCourses",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_courseId",
                "type": "uint256"
            }
        ],
        "name": "getCoursebyId",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "metadataURI",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "instructor",
                        "type": "address"
                    },
                    {
                        "internalType": "uint16",
                        "name": "royalties",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256",
                        "name": "maxSupply",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalMinted",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract Course",
                        "name": "course",
                        "type": "address"
                    },
                    {
                        "internalType": "uint8",
                        "name": "rating",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct TutorPal.CourseStruct",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_instructor",
                "type": "address"
            }
        ],
        "name": "getInstructorCourseIds",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_instructor",
                "type": "address"
            }
        ],
        "name": "getInstructorCourses",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUserProfile",
        "outputs": [
            {
                "internalType": "string",
                "name": "displayName",
                "type": "string"
            },
            {
                "internalType": "enum IDecentralizedProfiles.RoleType",
                "name": "roleType",
                "type": "uint8"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_displayName",
                "type": "string"
            },
            {
                "internalType": "enum IDecentralizedProfiles.RoleType",
                "name": "_roleType",
                "type": "uint8"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "admin",
                "type": "address"
            }
        ],
        "name": "removeAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "courseId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "validateCourseReview",
        "outputs": [],
        "stateMutability": "view",
        "type": "function"
    }
]