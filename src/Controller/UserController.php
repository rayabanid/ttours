<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Gedmo\Sluggable\Util\Urlizer;

class UserController extends AbstractController
{
	/**
	 * @Route("/users", name="user_list")
	 * @IsGranted("IS_AUTHENTICATED_FULLY")
	 * @param UserRepository $userRepository
     * @return Response
	 */
	public function index(UserRepository $userRepository): Response
	{
		return $this->render('user/index.html.twig', [
			'users' => $userRepository->findAll(),
		]);
	}

	/**
     * @Route("/user/new", name="user_new", methods={"GET","POST"}, options={"expose"=true})
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return Response
     */
	public function new(Request $request, UserPasswordEncoderInterface $encoder)
	{
		$user = new User();
		$form = $this->createForm(UserType::class, $user);

		if ($request->isXmlHttpRequest()) {
			$user->setFirstName($request->request->get('firstName'));
			$user->setLastName($request->request->get('lastName'));
			$user->setEmail($request->request->get('email'));
			$user->setRoles($user->getRoles());

			// encode the password
			$password = $form->get('password')->getData();
			$encoder = $encoder->encodePassword($user, $password);
			$user->setPassword($encoder);

			// upload image
			$profileImage = $request->files->get('profileImage');
			if ($profileImage) {
				$filename = $this->handleUpload($profileImage);
				$user->setProfileImage($filename);
			}

			// set timestamps
			$user->updatedTimestamps();

			$entityManager = $this->getDoctrine()->getManager();
			$entityManager->persist($user);
			$entityManager->flush();

			$redirectUrl = $this->generateUrl('user_list');
			$data = [
				'status' => 'success',
				'url' => $redirectUrl,
				'message' => 'User successfully created'
			];

			return new JsonResponse($data);
		}

		return $this->render('user/new.html.twig', [
            'user' => $user,
            'form' => $form->createView()
        ]);
	}

	/**
     * @Route("/user/edit/{id}", name="user_edit", methods={"GET","POST"}, options={"expose"=true})
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @param Request $request
     * @param User $user
     * @return Response
     */
	public function edit(Request $request, User $user): Response
	{
		$form = $this->createForm(UserType::class, $user);
		$form->remove('password');

		if ($request->isXmlHttpRequest()) {
			$user->setFirstName($request->request->get('firstName'));
			$user->setLastName($request->request->get('lastName'));
			$user->setEmail($request->request->get('email'));

			// upload image
			$profileImage = $request->files->get('profileImage');
			if ($profileImage) {
				$filename = $this->handleUpload($profileImage);
				$user->setProfileImage($filename);
			}

			$entityManager = $this->getDoctrine()->getManager();
			$entityManager->persist($user);
			$entityManager->flush();

			$redirectUrl = $this->generateUrl('user_list');
			$data = [
				'status' => 'success',
				'url' => $redirectUrl,
				'message' => 'User successfully updated'
			];

			return new JsonResponse($data);
		}

		return $this->render('user/edit.html.twig', [
            'user' => $user,
            'form' => $form->createView()
        ]);
	}

	/**
     * @Route("/user/{id}", name="user_delete", options={"expose"=true})
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @param Request $request
     * @param User $user
     * @return Response
     */
	public function delete(Request $request, User $user): JsonResponse
	{
		if ($request->isXmlHttpRequest()) {
			$entityManager = $this->getDoctrine()->getManager();
			$entityManager->remove($user);
			$entityManager->flush();

			$data = [
				'status' => 'success',
				'message' => 'User successfully deleted'
			];
			return new JsonResponse($data);
		}
    }

    /**
     * @param object $file
     * @return string
     */
    private function handleUpload($file): string
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $filename = Urlizer::urlize($originalFilename).'-'.uniqid().'.'.$file->guessExtension();
        $uploads_directory = $this->getParameter('uploads_directory').'/users';
        $file->move($uploads_directory, $filename);

        return $filename;
    }

    /**
	 * @Route("/account", name="user_account", methods={"GET","POST"}, options={"expose"=true})
	 * @IsGranted("IS_AUTHENTICATED_FULLY")
	 * @param Request $request
     * @param Security $security
     * @return Response
	 */
	public function account(Request $request, Security $security): Response
	{
		$user = $security->getUser();
		$form = $this->createForm(UserType::class, $user);

		if ($request->isXmlHttpRequest()) {
			$user->setFirstName($request->request->get('firstName'));
			$user->setLastName($request->request->get('lastName'));
			$user->setEmail($request->request->get('email'));

			// upload image
			$profileImage = $request->files->get('profileImage');
            if ($profileImage) {
            	$filename = $this->handleUpload($profileImage);
                $user->setProfileImage($filename);
            }

			$entityManager = $this->getDoctrine()->getManager();
			$entityManager->persist($user);
			$entityManager->flush();

			$redirectUrl = $request->getUri();
			$data = [
				'status' => 'success',
				'url' => $redirectUrl,
				'message' => 'Account successfully updated'
			];

			return new JsonResponse($data);
		}

		return $this->render('user/account.html.twig', [
			'user' => $user,
			'form' => $form->createView()
		]);
	}
}